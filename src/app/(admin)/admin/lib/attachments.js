// ─── Attachment helpers ───────────────────────────────────────────────────────
// The inquiry-files bucket is PRIVATE. Stored values are either:
//   - A plain file path (new format): "1718234567-abc.pdf"
//   - A full https:// URL (legacy, pre-private-bucket): used as-is
//
// For new-format paths we generate a 1-hour signed URL via the admin's
// authenticated Supabase session before downloading or opening.

export const STORAGE_BUCKET = 'inquiry-files';
export const SIGNED_URL_EXPIRY_SECONDS = 3600; // 1 hour

function isStoredPath(value) {
  return !value.startsWith('http');
}

export async function resolveAttachmentUrl(supabaseClient, value) {
  if (!isStoredPath(value)) return value; // legacy full URL — use directly
  const { data, error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(value, SIGNED_URL_EXPIRY_SECONDS);
  if (error) throw error;
  return data.signedUrl;
}

export async function downloadAttachment(supabaseClient, value, fileName, setDownloading) {
  try {
    setDownloading(true);
    const url = await resolveAttachmentUrl(supabaseClient, value);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error('Download failed:', err);
    alert('Download failed. Please try again.');
  } finally {
    setDownloading(false);
  }
}
