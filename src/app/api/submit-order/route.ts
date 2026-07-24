import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { toInquiryDbContactType, validateOrderFormServer, resolveSubmitContact, fieldValidationResponse, SUBMIT_ORDER_FIELDS as F, type FieldErrors } from '@/features/orders';
import { checkEmailAddress, checkWhatsAppNumber } from '@/features/verification';
import { logError } from '@/shared/logger/logger';
import { buildSubmitContactKey, enforceSubmitRateLimits } from '@/shared/rate-limit/rate-limit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

function respondFieldErrors(errors: FieldErrors): NextResponse {
  const payload = fieldValidationResponse(errors);
  return NextResponse.json(payload || { errors, error: 'Validation error.' }, { status: 400 });
}

function contactVerificationError(message: string, serviceError: boolean | undefined): NextResponse {
  if (serviceError) {
    return NextResponse.json({ errors: { [F.contact]: message }, error: message }, { status: 502 });
  }
  return respondFieldErrors({ [F.contact]: message });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    service_id, custom_service, deadline, description,
    attachments,
  } = body as {
    service_id?: string;
    custom_service?: string;
    deadline?: string;
    description?: string;
    attachments?: unknown;
  };

  const resolvedContact = resolveSubmitContact(body as Parameters<typeof resolveSubmitContact>[0], request);
  if ('error' in resolvedContact) {
    return respondFieldErrors({ [F.contact]: resolvedContact.error });
  }

  const {
    isEmail, contact_type, contact, phone, country_dial, country_iso, country_name,
    e164Digits, rateLimitBody,
  } = resolvedContact.isEmail
    ? { ...resolvedContact, e164Digits: undefined }
    : resolvedContact;

  const fieldErrors = validateOrderFormServer(body as Parameters<typeof validateOrderFormServer>[0]);
  if (Object.keys(fieldErrors).length > 0) {
    return respondFieldErrors(fieldErrors);
  }

  const rateLimited = await enforceSubmitRateLimits(request, buildSubmitContactKey(rateLimitBody));
  if (rateLimited) return rateLimited;

  if (!isEmail) {
    const whapi = await checkWhatsAppNumber(e164Digits!);
    if (whapi.configured && !whapi.valid) {
      const message = whapi.error || 'This number is not registered on WhatsApp.';
      return contactVerificationError(message, whapi.serviceError);
    }
  } else {
    const emailCheck = await checkEmailAddress(contact!);
    if (emailCheck.configured && !emailCheck.valid) {
      const message = emailCheck.error || 'This email address could not be verified.';
      return contactVerificationError(message, emailCheck.serviceError);
    }
  }

  const { error } = await supabase.from('inquiries').insert({
    submitted_at:   new Date().toISOString(),
    phone:          isEmail ? '' : (phone as string).trim(),
    country_dial:   isEmail ? '' : ((country_dial as string)?.trim() || ''),
    country_iso:    isEmail ? '' : ((country_iso as string)?.trim() || ''),
    country_name:   isEmail ? '' : ((country_name as string)?.trim() || ''),
    contact_type:   toInquiryDbContactType(contact_type),
    contact:        isEmail ? (contact as string).trim() : null,
    service_id:     (service_id as string).trim(),
    custom_service: service_id === 'other' ? ((custom_service as string)?.trim() || '') : '',
    deadline,
    description:    (description as string).trim(),
    status:         'new',
    claimed_by:     null,
    claimed_at:     null,
    completed_at:   null,
    notes:          '',
    attachments,
  });

  if (error) {
    logError('submit-order', error);
    return NextResponse.json(
      { error: 'Failed to submit your order. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
