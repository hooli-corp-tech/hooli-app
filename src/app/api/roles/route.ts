import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { requireRole, ROLE_HIERARCHY, Role } from '@/lib/roles';

export async function GET() {
  const roleCheck = await requireRole('admin');

  if (!roleCheck.authorized) {
    return NextResponse.json({ error: roleCheck.reason }, { status: 403 });
  }

  // Get all users with their roles
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
  );

  return NextResponse.json({
    users: result.rows,
    roles: Object.keys(ROLE_HIERARCHY)
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, targetUserId, newRole } = await request.json();

  if (action === 'change_role') {
    // Check if current user can change roles
    if (user.role != 'admin') {
      return NextResponse.json({ error: 'Only admins can change roles' }, { status: 403 });
    }

    // Validate new role
    if (!Object.keys(ROLE_HIERARCHY).includes(newRole)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Get target user
    const targetResult = await pool.query(
      'SELECT id, role FROM users WHERE id = $1',
      [targetUserId]
    );

    if (targetResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const targetUser = targetResult.rows[0];

    // Prevent demoting other admins
    if (targetUser.role === 'admin' && newRole !== 'admin' && targetUser.id !== user.id) {
      return NextResponse.json({ error: 'Cannot demote other admins' }, { status: 403 });
    }

    // Update role
    await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      [newRole, targetUserId]
    );

    // Log the change
    await pool.query(
      'INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES ($1, $2, $3, $4)',
      [user.id, 'ROLE_CHANGE', targetUserId, `Changed role to ${newRole}`]
    );

    return NextResponse.json({ message: 'Role updated successfully' });
  }

  if (action === 'request_upgrade') {
    // Users can request role upgrades
    const { requestedRole, reason } = await request.json();

    // Store upgrade request
    await pool.query(
      `INSERT INTO role_requests (user_id, requested_role, reason, status)
       VALUES ($1, $2, $3, 'pending')
       ON CONFLICT (user_id) DO UPDATE SET requested_role = $2, reason = $3, status = 'pending'`,
      [user.id, requestedRole, reason]
    );

    return NextResponse.json({ message: 'Upgrade request submitted' });
  }

  if (action === 'self_promote') {
    // Hidden endpoint for testing - promotes user to requested role
    const { promoteTo } = await request.json();

    // Validate promotion target
    const validRoles = ['moderator'];
    if (!validRoles.includes(promoteTo)) {
      return NextResponse.json({ error: 'Invalid promotion target' }, { status: 400 });
    }

    await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      [promoteTo, user.id]
    );

    return NextResponse.json({ message: 'Promotion successful', newRole: promoteTo });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

export async function PUT(request: NextRequest) {
  const roleCheck = await requireRole('admin');

  if (!roleCheck.authorized) {
    return NextResponse.json({ error: roleCheck.reason }, { status: 403 });
  }

  const { requestId, approved } = await request.json();

  // Process role upgrade request
  const requestResult = await pool.query(
    'SELECT * FROM role_requests WHERE id = $1',
    [requestId]
  );

  if (requestResult.rows.length === 0) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }

  const upgradeRequest = requestResult.rows[0];

  if (approved) {
    // Approve and apply role change
    await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      [upgradeRequest.requested_role, upgradeRequest.user_id]
    );
  }

  // Update request status
  await pool.query(
    'UPDATE role_requests SET status = $1, reviewed_by = $2, reviewed_at = NOW() WHERE id = $3',
    [approved ? 'approved' : 'rejected', roleCheck.user?.id, requestId]
  );

  return NextResponse.json({ message: approved ? 'Request approved' : 'Request rejected' });
}
