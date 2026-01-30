import { NextRequest, NextResponse } from 'next/server';
import pool, { Order, OrderItem, ensureDB } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

interface OrderItemWithProduct extends OrderItem {
  product_name: string;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await ensureDB();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );
    const order = orderResult.rows[0] as Order | undefined;

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const itemsResult = await pool.query(`
      SELECT oi.*, p.name as product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [order.id]);
    const items = itemsResult.rows as OrderItemWithProduct[];

    return NextResponse.json({ order, items });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
