import { NextRequest, NextResponse } from 'next/server';
import pool, { ensureDB } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    await ensureDB();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Check if email is already taken by another user
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 AND id != $2',
      [email, user.id]
    );
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
    }

    await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
