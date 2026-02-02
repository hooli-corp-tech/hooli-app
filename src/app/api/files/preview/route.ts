import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readFile, stat } from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR || './uploads';
const MAX_PREVIEW_SIZE = 1024 * 1024; // 1MB max preview

// Allowed file extensions for preview
const ALLOWED_EXTENSIONS = ['.txt', '.md', '.json', '.csv', '.log', '.xml', '.html'];

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.csv': 'text/csv',
    '.log': 'text/plain',
    '.xml': 'application/xml',
    '.html': 'text/html',
  };
  return types[ext] || 'application/octet-stream';
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  if (!filename) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 });
  }

  // Check file extension
  const ext = path.extname(filename).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json({
      error: `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`
    }, { status: 400 });
  }

  // Construct file path
  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    // Check file exists and get stats
    const stats = await stat(filePath);

    if (!stats.isFile()) {
      return NextResponse.json({ error: 'Not a file' }, { status: 400 });
    }

    if (stats.size > MAX_PREVIEW_SIZE) {
      return NextResponse.json({
        error: 'File too large for preview',
        size: stats.size,
        maxSize: MAX_PREVIEW_SIZE
      }, { status: 400 });
    }

    // Read file content
    const content = await readFile(filePath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': getContentType(filename),
        'X-File-Size': stats.size.toString(),
        'X-File-Modified': stats.mtime.toISOString(),
      }
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, files } = await request.json();

  if (action === 'batch_preview') {
    // Get metadata for multiple files
    const results = await Promise.all(
      files.map(async (filename: string) => {
        const filePath = path.join(UPLOADS_DIR, filename);
        try {
          const stats = await stat(filePath);
          return {
            filename,
            size: stats.size,
            modified: stats.mtime,
            previewable: stats.size <= MAX_PREVIEW_SIZE && ALLOWED_EXTENSIONS.includes(path.extname(filename))
          };
        } catch {
          return { filename, error: 'Not found' };
        }
      })
    );

    return NextResponse.json({ files: results });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
