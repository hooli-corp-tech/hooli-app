import { NextRequest, NextResponse } from 'next/server';
import pool, { BankAccount } from '@/lib/db';

// Get bank account details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await pool.query<BankAccount>(
    'SELECT * FROM bank_accounts WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Bank account not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// Update bank account balance
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  await pool.query(
    'UPDATE bank_accounts SET balance = $1 WHERE id = $2',
    [body.balance, id]
  );

  return NextResponse.json({ message: 'Balance updated' });
}
