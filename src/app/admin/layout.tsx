import type { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/sonner';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
