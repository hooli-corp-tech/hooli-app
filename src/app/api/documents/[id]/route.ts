import { NextRequest, NextResponse } from 'next/server';
import pool, { Document } from '@/lib/db';



export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await pool.query<Document>(
    'SELECT * FROM documents WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  await pool.query(
    'UPDATE documents SET title = $1, content = $2 WHERE id = $3',
    [body.title, body.content, id]
  );

  return NextResponse.json({ message: 'Document updated' });
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await pool.query('DELETE FROM documents WHERE id = $1', [id]);

  return NextResponse.json({ message: 'Document deleted' });
}
