import { NextRequest, NextResponse } from 'next/server';
import pool, { Product, ensureDB } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

interface OrderItem {
  productId: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    await ensureDB();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to place an order' }, { status: 401 });
    }

    const { items, shippingAddress } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'At least one item is required' }, { status: 400 });
    }

    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Calculate total and validate products
    let total = 0;
    const orderItems: { product: Product; quantity: number }[] = [];

    for (const item of items as OrderItem[]) {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [item.productId]);
      const product = result.rows[0] as Product | undefined;

      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 400 });
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
      }

      total += product.price * item.quantity;
      orderItems.push({ product, quantity: item.quantity });
    }

    // Create order
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total, shipping_address) VALUES ($1, $2, $3) RETURNING id',
      [user.id, total, shippingAddress]
    );

    const orderId = orderResult.rows[0].id;

    // Create order items and update stock
    for (const item of orderItems) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product.id, item.quantity, item.product.price]
      );

      await pool.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product.id]
      );
    }

    return NextResponse.json({ orderId, total });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'An error occurred while placing the order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureDB();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to view orders' }, { status: 401 });
    }

    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [user.id]
    );

    return NextResponse.json({ orders: result.rows });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching orders' }, { status: 500 });
  }
}
