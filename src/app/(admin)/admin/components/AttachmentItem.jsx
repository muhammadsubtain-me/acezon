'use client';

import { useState } from 'react';
import { FileText, Image, Download, Loader2 } from 'lucide-react';
import { downloadAttachment } from '../lib/attachments';

export default function AttachmentItem({ value, supabaseClient }) {
  const [downloading, setDownloading] = useState(false);
  // Derive a human-readable filename from path or URL
  const fileName = decodeURIComponent(value.split('/').pop());
  const isImage  = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

  return (
    <button
      type="button"
      disabled={downloading}
      onClick={() => downloadAttachment(supabaseClient, value, fileName, setDownloading)}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] active:scale-[0.98] transition-all group disabled:opacity-60 disabled:cursor-not-allowed text-left"
    >
      {isImage
        ? <Image className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
        : <FileText className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
      }
      <span className="text-xs text-[var(--color-text)] truncate flex-1">{fileName}</span>
      {downloading
        ? <Loader2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] animate-spin" />
        : <Download className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
}
