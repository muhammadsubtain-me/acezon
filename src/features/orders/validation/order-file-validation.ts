import { allowedFileTypes, maxFileSize, acceptedFileExtensions } from '@/features/orders/config/order.config';

export const ALLOWED_EXTENSIONS = new Set(
  acceptedFileExtensions.split(',').map((e) => e.trim().replace(/^\./, '').toLowerCase())
);

export function getFileExtension(fileName: string): string | null {
  const ext = (fileName.split('.').pop() || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return ext || null;
}

function isAllowedOrderFile(fileName: string, mimeType = ''): boolean {
  const type = (mimeType || '').trim();
  if (type && allowedFileTypes.includes(type)) return true;
  const ext = getFileExtension(fileName);
  return Boolean(ext && ALLOWED_EXTENSIONS.has(ext));
}

function getOrderFileRejection(fileName: string, size: number, mimeType = ''): string | null {
  if (!fileName?.trim()) return 'Invalid file.';
  if (!isAllowedOrderFile(fileName, mimeType)) {
    return `"${fileName}" — unsupported type`;
  }
  if (typeof size !== 'number' || size <= 0 || size > maxFileSize) {
    return `"${fileName}" — exceeds 10 MB`;
  }
  return null;
}

export interface FileMetadata {
  name: string;
  size: number;
  type?: string;
}

export function getFileRejection(file: FileMetadata): string | null {
  return getOrderFileRejection(file?.name, file?.size, file?.type);
}

export function validateOrderFileMetadataList(files: FileMetadata[]): string[] {
  const rejected: string[] = [];
  if (!Array.isArray(files)) return ['Invalid file metadata.'];
  for (const f of files) {
    const reason = getOrderFileRejection(f?.name, f?.size, f?.type);
    if (reason) rejected.push(reason);
  }
  return rejected;
}

export class AttachmentUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AttachmentUploadError';
  }
}

export function toAttachmentUploadMessage(err: unknown): string {
  if (err instanceof AttachmentUploadError) return err.message;
  const msg = (err as { message?: string })?.message || '';
  if (msg && !msg.toLowerCase().includes('fetch')) return msg;
  return 'Could not upload your files. Please check your connection and try again.';
}
