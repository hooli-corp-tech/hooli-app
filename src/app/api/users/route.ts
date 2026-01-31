import { NextResponse } from 'next/server';
import pool, { User } from '@/lib/db';



export async function GET() {
  const result = await pool.query<User>(
    'SELECT id, email, name, role, created_at FROM users'
  );

  return NextResponse.json(result.rows);
}
