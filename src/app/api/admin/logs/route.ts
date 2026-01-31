import { NextResponse } from 'next/server';
import pool, { AdminLog } from '@/lib/db';

// VULNERABLE: Admin-only endpoint accessible to anyone
// Should check if user has admin role but doesn't
export async function GET() {
  const result = await pool.query<AdminLog>(
    'SELECT * FROM admin_logs ORDER BY created_at DESC'
  );

  // VULNERABILITY: Exposing sensitive admin logs to anyone
  return NextResponse.json(result.rows);
}

// VULNERABLE: Anyone can create admin logs
export async function POST(request: Request) {
  const body = await request.json();

  await pool.query(
    'INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES ($1, $2, $3, $4)',
    [body.admin_id, body.action, body.target_user_id, body.details]
  );

  return NextResponse.json({ message: 'Log created' });
}
