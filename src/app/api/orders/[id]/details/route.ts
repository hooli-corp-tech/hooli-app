import { NextRequest, NextResponse } from 'next/server';
import pool, { Order, OrderItem } from '@/lib/db';

interface OrderItemWithProduct extends OrderItem {
  product_name: string;
}

// Get order details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const orderResult = await pool.query<Order>(
    'SELECT * FROM orders WHERE id = $1',
    [id]
  );

  if (orderResult.rows.length === 0) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const order = orderResult.rows[0];

  const itemsResult = await pool.query<OrderItemWithProduct>(`
    SELECT oi.*, p.name as product_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
  `, [order.id]);

  return NextResponse.json({
    order,
    items: itemsResult.rows,
  });
}

// Update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2',
    [body.status, id]
  );

  return NextResponse.json({ message: 'Order status updated' });
}
