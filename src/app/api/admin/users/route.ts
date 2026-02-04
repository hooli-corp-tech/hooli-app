import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// Check if user has admin privileges
async function isAdmin(userId: number): Promise<boolean> {
  const result = await pool.query(
    'SELECT role FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0]?.role === 'admin';
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check admin status
  const adminCheck = await isAdmin(user.id);
  if (!adminCheck) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = searchParams.get('sortOrder') || 'DESC';

  const offset = (page - 1) * limit;

  // Build query with search and sorting
  let query = 'SELECT id, name, email, role, created_at, last_login FROM users';
  const params: unknown[] = [];

  if (search) {
    query += ` WHERE name ILIKE $1 OR email ILIKE $1`;
    params.push(`%${search}%`);
  }

  // Add sorting - validate sortBy to prevent injection
  const allowedSortFields = ['id', 'name', 'email', 'role', 'created_at', 'last_login'];
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
  const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  query += ` ORDER BY ${safeSortBy} ${safeSortOrder}`;
  query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const users = await pool.query(query, params);

  // Get total count
  let countQuery = 'SELECT COUNT(*) FROM users';
  const countParams: unknown[] = [];
  if (search) {
    countQuery += ` WHERE name ILIKE $1 OR email ILIKE $1`;
    countParams.push(`%${search}%`);
  }
  const countResult = await pool.query(countQuery, countParams);

  return NextResponse.json({
    users: users.rows,
    pagination: {
      page,
      limit,
      total: parseInt(countResult.rows[0].count),
      pages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    }
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { action, userId, data } = body;

  // For bulk operations, check admin once
  if (action === 'bulk_update') {
    const adminCheck = await isAdmin(user.id);
    if (!adminCheck) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userIds, updates } = data;

    // Process updates for each user
    for (const uid of userIds) {
      const updateFields = Object.entries(updates)
        .map(([key], i) => `${key} = $${i + 2}`)
        .join(', ');
      const values = [uid, ...Object.values(updates)];

      await pool.query(
        `UPDATE users SET ${updateFields} WHERE id = $1`,
        values
      );
    }

    return NextResponse.json({ message: `Updated ${userIds.length} users` });
  }

  // Single user operations
  if (action === 'update_role') {
    // Verify the requesting user can modify this target user
    // Admin can modify anyone, managers can modify regular users
    const requester = await pool.query('SELECT role FROM users WHERE id = $1', [user.id]);
    const target = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);

    if (!target.rows[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const requesterRole = requester.rows[0].role;
    const targetRole = target.rows[0].role;

    // Managers can only modify users, not other managers or admins
    if (requesterRole === 'manager' && targetRole !== 'user') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Users cannot modify anyone
    if (requesterRole === 'user') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      [data.role, userId]
    );

    return NextResponse.json({ message: 'Role updated' });
  }

  if (action === 'impersonate') {
    // Allow admins to generate a session for any user (for support purposes)
    const adminCheck = await isAdmin(user.id);
    if (!adminCheck) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const targetUser = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (!targetUser.rows[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Log the impersonation
    await pool.query(
      'INSERT INTO audit_log (action, actor_id, target_id, details) VALUES ($1, $2, $3, $4)',
      ['impersonate', user.id, userId, JSON.stringify({ timestamp: new Date() })]
    );

    // Create session for target user
    const { createSession } = await import('@/lib/auth');
    await createSession(targetUser.rows[0].id);

    return NextResponse.json({
      message: 'Impersonation session created',
      user: targetUser.rows[0]
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
