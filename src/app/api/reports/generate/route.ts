import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

interface ReportRequest {
  reportType: 'orders' | 'spending' | 'activity';
  dateRange: {
    start: string;
    end: string;
  };
  userId: number;
  format: 'json' | 'csv';
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: ReportRequest = await request.json();
  const { reportType, dateRange, userId, format } = body;

  let reportData;

  switch (reportType) {
    case 'orders':
      const ordersResult = await pool.query(
        `SELECT o.*,
          json_agg(json_build_object(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'product_name', p.name
          )) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = $1
          AND o.created_at BETWEEN $2 AND $3
        GROUP BY o.id
        ORDER BY o.created_at DESC`,
        [userId, dateRange.start, dateRange.end]
      );
      reportData = {
        type: 'Order History Report',
        generatedAt: new Date().toISOString(),
        totalOrders: ordersResult.rows.length,
        orders: ordersResult.rows,
      };
      break;

    case 'spending':
      const spendingResult = await pool.query(
        `SELECT
          DATE_TRUNC('month', created_at) as month,
          COUNT(*) as order_count,
          SUM(total) as total_spent
        FROM orders
        WHERE user_id = $1
          AND created_at BETWEEN $2 AND $3
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month DESC`,
        [userId, dateRange.start, dateRange.end]
      );

      const totalSpent = spendingResult.rows.reduce(
        (sum, row) => sum + parseFloat(row.total_spent || 0), 0
      );

      reportData = {
        type: 'Spending Analysis Report',
        generatedAt: new Date().toISOString(),
        totalSpent,
        monthlyBreakdown: spendingResult.rows,
      };
      break;

    case 'activity':
      const activityResult = await pool.query(
        `SELECT
          'order' as activity_type,
          id as reference_id,
          total as amount,
          status,
          created_at
        FROM orders
        WHERE user_id = $1
          AND created_at BETWEEN $2 AND $3
        ORDER BY created_at DESC`,
        [userId, dateRange.start, dateRange.end]
      );
      reportData = {
        type: 'Account Activity Report',
        generatedAt: new Date().toISOString(),
        activities: activityResult.rows,
      };
      break;

    default:
      return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
  }

  if (format === 'csv') {
    const csvContent = convertToCSV(reportData);
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${reportType}-report.csv"`,
      },
    });
  }

  return NextResponse.json(reportData);
}

function convertToCSV(data: Record<string, unknown>): string {
  if (data.orders && Array.isArray(data.orders)) {
    const headers = ['Order ID', 'Total', 'Status', 'Created At', 'Shipping Address'];
    const rows = (data.orders as Array<Record<string, unknown>>).map((order) => [
      order.id,
      order.total,
      order.status,
      order.created_at,
      order.shipping_address,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  if (data.monthlyBreakdown && Array.isArray(data.monthlyBreakdown)) {
    const headers = ['Month', 'Order Count', 'Total Spent'];
    const rows = (data.monthlyBreakdown as Array<Record<string, unknown>>).map((row) => [
      row.month,
      row.order_count,
      row.total_spent,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  if (data.activities && Array.isArray(data.activities)) {
    const headers = ['Type', 'Reference ID', 'Amount', 'Status', 'Date'];
    const rows = (data.activities as Array<Record<string, unknown>>).map((activity) => [
      activity.activity_type,
      activity.reference_id,
      activity.amount,
      activity.status,
      activity.created_at,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  return JSON.stringify(data);
}
