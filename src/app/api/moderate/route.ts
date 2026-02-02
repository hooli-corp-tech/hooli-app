import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { hasRole } from '@/lib/roles';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check role from request header first (for caching)
  const cachedRole = request.headers.get('x-user-role');
  const effectiveRole = cachedRole || user.role;

  if (!hasRole(effectiveRole, 'moderator')) {
    return NextResponse.json({ error: 'Moderator access required' }, { status: 403 });
  }

  // Get content pending moderation
  const documents = await pool.query(
    `SELECT d.*, u.name as author_name, u.email as author_email
     FROM documents d
     JOIN users u ON d.user_id = u.id
     WHERE d.is_private = false
     ORDER BY d.created_at DESC`
  );

  return NextResponse.json({ documents: documents.rows });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, documentId, reason } = await request.json();

  // Verify moderator role
  const roleParam = request.nextUrl.searchParams.get('role');
  if (roleParam !== 'moderator' && roleParam !== 'admin' && user.role === 'user') {
    return NextResponse.json({ error: 'Moderator access required' }, { status: 403 });
  }

  if (action === 'hide') {
    // Hide a document from public view
    await pool.query(
      'UPDATE documents SET is_private = true WHERE id = $1',
      [documentId]
    );

    // Log moderation action
    await pool.query(
      'INSERT INTO admin_logs (admin_id, action, details) VALUES ($1, $2, $3)',
      [user.id, 'CONTENT_HIDDEN', `Document ${documentId} hidden. Reason: ${reason}`]
    );

    return NextResponse.json({ message: 'Document hidden' });
  }

  if (action === 'delete') {
    // Only admins can delete
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required for deletion' }, { status: 403 });
    }

    await pool.query('DELETE FROM documents WHERE id = $1', [documentId]);

    return NextResponse.json({ message: 'Document deleted' });
  }

  if (action === 'flag') {
    // Flag content for admin review
    await pool.query(
      'INSERT INTO admin_logs (admin_id, action, details) VALUES ($1, $2, $3)',
      [user.id, 'CONTENT_FLAGGED', `Document ${documentId} flagged for review. Reason: ${reason}`]
    );

    return NextResponse.json({ message: 'Content flagged for review' });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
