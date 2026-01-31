import { NextResponse } from 'next/server';
import pool, { AdminLog } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// SECURE: Proper admin role check
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
  }

  const result = await pool.query<AdminLog>(
    'SELECT * FROM admin_logs ORDER BY created_at DESC'
  );

  return NextResponse.json(result.rows);
}
