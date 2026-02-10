import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// Deep merge utility for nested settings objects
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
      result[key] = deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

// Validate webhook URL - must be HTTPS
function isValidWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Allow https or http for internal services
    return parsed.protocol === 'https:' || parsed.hostname === 'localhost' || parsed.hostname.endsWith('.internal');
  } catch {
    return false;
  }
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await pool.query(
    'SELECT id, name, email, role, settings, webhook_url, display_name, created_at FROM users WHERE id = $1',
    [user.id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    user: result.rows[0],
    settings: result.rows[0].settings || {}
  });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Get current user settings
  const currentUser = await pool.query(
    'SELECT settings FROM users WHERE id = $1',
    [user.id]
  );

  if (currentUser.rows.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const currentSettings = currentUser.rows[0].settings || {};

  // Merge new settings with existing ones
  const mergedSettings = body.settings ? deepMerge(currentSettings, body.settings) : currentSettings;

  // Validate webhook URL if provided
  if (body.webhook_url && !isValidWebhookUrl(body.webhook_url)) {
    return NextResponse.json({ error: 'Invalid webhook URL' }, { status: 400 });
  }

  // Build dynamic update query based on provided fields
  const updates: string[] = [];
  const values: unknown[] = [];
  let paramCount = 1;

  // Allow updating user preferences
  const allowedFields = ['display_name', 'webhook_url', 'notification_email', 'timezone', 'locale'];

  for (const [key, value] of Object.entries(body)) {
    if (key !== 'settings' && value !== undefined) {
      updates.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  }

  // Always update settings
  updates.push(`settings = $${paramCount}`);
  values.push(JSON.stringify(mergedSettings));
  paramCount++;

  // Add user ID for WHERE clause
  values.push(user.id);

  const updateQuery = `
    UPDATE users
    SET ${updates.join(', ')}, updated_at = NOW()
    WHERE id = $${paramCount}
    RETURNING id, name, email, role, settings, webhook_url, display_name
  `;

  const result = await pool.query(updateQuery, values);

  // If webhook URL is set, send a test notification
  if (body.webhook_url) {
    try {
      await fetch(body.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'settings_updated',
          user_id: user.id,
          timestamp: new Date().toISOString()
        })
      });
    } catch {
      // Webhook delivery is best-effort
    }
  }

  return NextResponse.json({
    message: 'Settings updated',
    user: result.rows[0]
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, template } = await request.json();

  if (action === 'export') {
    // Export user data including settings
    const userData = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [user.id]
    );

    if (userData.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's order history for export
    const orders = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1',
      [user.id]
    );

    // If custom template provided, use it for formatting
    let exportData;
    if (template) {
      // Apply custom template formatting
      const templateFn = new Function('user', 'orders', `return \`${template}\``);
      exportData = templateFn(userData.rows[0], orders.rows);
    } else {
      exportData = {
        user: userData.rows[0],
        orders: orders.rows,
        exported_at: new Date().toISOString()
      };
    }

    return NextResponse.json({ data: exportData });
  }

  if (action === 'import') {
    // Handle settings import - to be implemented
    return NextResponse.json({ message: 'Import not yet implemented' });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
