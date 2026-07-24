import { maxFiles } from '@/features/orders/config/order.config';
import { ALLOWED_EXTENSIONS, getFileExtension } from '@/features/orders/validation/order-file-validation';

export const INQUIRY_FILES_BUCKET = 'inquiry-files';

export function isValidAttachmentPath(path: string): boolean {
  if (typeof path !== 'string') return false;
  const trimmed = path.trim();
  if (!trimmed || trimmed.length > 256) return false;
  if (/[\\\/]/.test(trimmed) || trimmed.includes('..')) return false;
  const ext = getFileExtension(trimmed.split('/').pop() || trimmed);
  return Boolean(ext && ALLOWED_EXTENSIONS.has(ext));
}

/** Attachments are optional — an empty array is valid. */
export function attachmentsAreValid(attachments: unknown): boolean {
  if (!Array.isArray(attachments)) return false;
  if (attachments.length === 0) return true;
  if (attachments.length > maxFiles) return false;
  return attachments.every(isValidAttachmentPath);
}
