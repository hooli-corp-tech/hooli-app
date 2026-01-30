import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Check if email is already taken by another user
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, user.id);
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
    }

    db.prepare(`
      UPDATE users SET name = ?, email = ? WHERE id = ?
    `).run(name, email, user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
