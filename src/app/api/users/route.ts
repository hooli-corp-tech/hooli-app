import { NextResponse } from 'next/server';
import pool, { User } from '@/lib/db';

// VULNERABLE: Lists all users without authentication
// Information disclosure vulnerability
export async function GET() {
  const result = await pool.query<User>(
    'SELECT id, email, name, role, created_at FROM users'
  );

  return NextResponse.json(result.rows);
}
