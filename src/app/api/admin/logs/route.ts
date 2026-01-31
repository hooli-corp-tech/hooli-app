import { NextResponse } from 'next/server';
import pool, { AdminLog } from '@/lib/db';



export async function GET() {
  const result = await pool.query<AdminLog>(
    'SELECT * FROM admin_logs ORDER BY created_at DESC'
  );

  
  return NextResponse.json(result.rows);
}


export async function POST(request: Request) {
  const body = await request.json();

  await pool.query(
    'INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES ($1, $2, $3, $4)',
    [body.admin_id, body.action, body.target_user_id, body.details]
  );

  return NextResponse.json({ message: 'Log created' });
}
