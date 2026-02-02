import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Check if user has admin privileges
async function isAdmin(userId: number): Promise<boolean> {
  const result = await db.query(
    'SELECT role FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0]?.role === 'admin';
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Check admin status
  const adminCheck = await isAdmin(payload.userId);
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

  const users = await db.query(query, params);

  // Get total count
  let countQuery = 'SELECT COUNT(*) FROM users';
  const countParams: unknown[] = [];
  if (search) {
    countQuery += ` WHERE name ILIKE $1 OR email ILIKE $1`;
    countParams.push(`%${search}%`);
  }
  const countResult = await db.query(countQuery, countParams);

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
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await request.json();
  const { action, userId, data } = body;

  // For bulk operations, check admin once
  if (action === 'bulk_update') {
    const adminCheck = await isAdmin(payload.userId);
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

      await db.query(
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
    const requester = await db.query('SELECT role FROM users WHERE id = $1', [payload.userId]);
    const target = await db.query('SELECT role FROM users WHERE id = $1', [userId]);

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

    await db.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      [data.role, userId]
    );

    return NextResponse.json({ message: 'Role updated' });
  }

  if (action === 'impersonate') {
    // Allow admins to generate a token for any user (for support purposes)
    const adminCheck = await isAdmin(payload.userId);
    if (!adminCheck) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const targetUser = await db.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (!targetUser.rows[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate impersonation token - includes flag to track it's impersonated
    const { generateToken } = await import('@/lib/auth');
    const impersonationToken = generateToken({
      userId: targetUser.rows[0].id,
      email: targetUser.rows[0].email,
      impersonatedBy: payload.userId
    });

    // Log the impersonation
    await db.query(
      'INSERT INTO audit_log (action, actor_id, target_id, details) VALUES ($1, $2, $3, $4)',
      ['impersonate', payload.userId, userId, JSON.stringify({ timestamp: new Date() })]
    );

    return NextResponse.json({
      token: impersonationToken,
      user: targetUser.rows[0]
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
