import { NextResponse, type NextRequest } from 'next/server';
import { maxFiles, isValidAttachmentPath, INQUIRY_FILES_BUCKET } from '@/features/orders';
import { logError } from '@/shared/logger/logger';
import { enforceUploadRateLimits, withSessionCookie } from '@/shared/rate-limit/rate-limit';
import { createSupabaseAdminClient } from '@/shared/supabase/admin';

function respond(body: object, init: ResponseInit, sessionId: string, isNew: boolean) {
  return withSessionCookie(NextResponse.json(body, init), sessionId, isNew);
}

function validateCleanupPaths(paths: unknown): string | null {
  if (!Array.isArray(paths) || paths.length === 0) return 'No paths provided.';
  if (paths.length > maxFiles) return 'Too many paths.';
  if (!paths.every(isValidAttachmentPath)) return 'Invalid attachment paths.';
  return null;
}

export async function POST(request: NextRequest) {
  const { blocked, sessionId, isNew } = await enforceUploadRateLimits(request);
  if (blocked) return withSessionCookie(blocked, sessionId, isNew);

  let body: { paths?: unknown };
  try {
    body = await request.json();
  } catch {
    return respond({ error: 'Invalid request body.' }, { status: 400 }, sessionId, isNew);
  }

  const validationError = validateCleanupPaths(body.paths);
  if (validationError) {
    return respond({ error: validationError }, { status: 400 }, sessionId, isNew);
  }

  try {
    const supabaseAdmin = createSupabaseAdminClient();
    const { error } = await supabaseAdmin.storage
      .from(INQUIRY_FILES_BUCKET)
      .remove(body.paths as string[]);
    if (error) throw error;
    return respond({ success: true }, { status: 200 }, sessionId, isNew);
  } catch (err) {
    logError('cleanup-uploads', err);
    return respond(
      { error: 'Could not remove uploaded files.' },
      { status: 500 },
      sessionId,
      isNew,
    );
  }
}

export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
