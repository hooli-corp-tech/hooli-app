import { NextRequest, NextResponse } from 'next/server';
import pool, { User } from '@/lib/db';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await pool.query<User>(
    'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [body.name, body.email, id]
  );

  return NextResponse.json({ message: 'User updated' });
}


export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  await pool.query(
    'UPDATE users SET role = $1 WHERE id = $2',
    [body.role, id]
  );

  return NextResponse.json({ message: 'Role updated' });
}
