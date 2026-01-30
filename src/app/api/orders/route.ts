import { NextRequest, NextResponse } from 'next/server';
import db, { Product } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

interface OrderItem {
  productId: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
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
      const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.productId) as Product | undefined;

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
    const orderResult = db.prepare(`
      INSERT INTO orders (user_id, total, shipping_address)
      VALUES (?, ?, ?)
    `).run(user.id, total, shippingAddress);

    const orderId = orderResult.lastInsertRowid;

    // Create order items and update stock
    for (const item of orderItems) {
      db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `).run(orderId, item.product.id, item.quantity, item.product.price);

      db.prepare(`
        UPDATE products SET stock = stock - ? WHERE id = ?
      `).run(item.quantity, item.product.id);
    }

    return NextResponse.json({ orderId, total });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'An error occurred while placing the order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to view orders' }, { status: 401 });
    }

    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    `).all(user.id);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching orders' }, { status: 500 });
  }
}
