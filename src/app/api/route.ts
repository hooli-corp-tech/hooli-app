import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Hooli API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      products: '/products',
      contact: '/contact',
    },
    documentation: 'https://hooli-corp.org/docs',
    timestamp: new Date().toISOString(),
  });
}
