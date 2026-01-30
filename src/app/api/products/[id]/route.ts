import { NextRequest, NextResponse } from 'next/server';
import pool, { Product, ensureDB } from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await ensureDB();
    const { id } = await params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const product = result.rows[0] as Product | undefined;

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
