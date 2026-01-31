import { NextRequest, NextResponse } from 'next/server';
import pool, { Document } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// SECURE: Proper access control check
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await pool.query<Document>(
    'SELECT * FROM documents WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  const document = result.rows[0];

  // Check ownership
  if (document.user_id !== user.id && user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(document);
}
