import { NextRequest, NextResponse } from 'next/server';
import { getApiKeyFromRequest, validateApiKey } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const apiKey = getApiKeyFromRequest(request);

  if (!validateApiKey(apiKey)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing API key' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    name: 'Hooli API',
    version: '1.0.0',
    status: 'operational',
  });
}
