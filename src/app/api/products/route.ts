import { NextRequest, NextResponse } from 'next/server';
import pool, { Product, ensureDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await ensureDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex++}`;
      params.push(category);
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex++} OR description ILIKE $${paramIndex++})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY id ASC';

    const result = await pool.query(query, params);
    const products = result.rows as Product[];

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
