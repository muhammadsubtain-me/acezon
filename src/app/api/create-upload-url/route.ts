import { NextResponse, type NextRequest } from 'next/server';
import { maxFiles, validateOrderFileMetadataList, type FileMetadata, INQUIRY_FILES_BUCKET } from '@/features/orders';
import { logError } from '@/shared/logger/logger';
import { enforceUploadRateLimits, withSessionCookie } from '@/shared/rate-limit/rate-limit';
import { createSupabaseAdminClient } from '@/shared/supabase/admin';

const supabaseAdmin = createSupabaseAdminClient();

function respond(body: object, init: ResponseInit, sessionId: string, isNew: boolean) {
  return withSessionCookie(NextResponse.json(body, init), sessionId, isNew);
}

function validateFiles(files: unknown): string | null {
  if (!Array.isArray(files) || files.length === 0) return 'At least one file is required.';
  if (files.length > maxFiles) return `You can attach up to ${maxFiles} files only.`;
  const rejected = validateOrderFileMetadataList(files as FileMetadata[]);
  if (rejected.length) return rejected.join(', ');
  return null;
}

function buildStoragePath(fileName: string): string {
  const ext = (fileName.split('.').pop() || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const suffix = ext ? `.${ext}` : '';
  return `${Date.now()}-${Math.random().toString(36).slice(2)}${suffix}`;
}

export async function POST(request: NextRequest) {
  const { blocked, sessionId, isNew } = await enforceUploadRateLimits(request);
  if (blocked) return withSessionCookie(blocked, sessionId, isNew);

  let body: { files?: unknown };
  try {
    body = await request.json();
  } catch {
    return respond({ error: 'Invalid request body.' }, { status: 400 }, sessionId, isNew);
  }

  const { files } = body;
  const validationError = validateFiles(files);
  if (validationError) {
    return respond({ error: validationError }, { status: 400 }, sessionId, isNew);
  }

  try {
    const uploads: { path: string; token: string }[] = [];
    for (const file of files as FileMetadata[]) {
      const path = buildStoragePath(file.name);
      const { data, error } = await supabaseAdmin.storage
        .from(INQUIRY_FILES_BUCKET)
        .createSignedUploadUrl(path);
      if (error) throw error;
      uploads.push({ path: data.path, token: data.token });
    }
    return respond({ uploads }, { status: 200 }, sessionId, isNew);
  } catch (err) {
    logError('create-upload-url', err);
    return respond(
      { error: 'Could not prepare file upload. Please try again.' },
      { status: 500 },
      sessionId,
      isNew,
    );
  }
}

export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
