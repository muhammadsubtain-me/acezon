import React from 'react';
import { AdminThemeProvider } from '@/components/admin/admin-theme-provider';
import { ToastProvider } from '@/components/ui/sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AdminThemeProvider>
  );
}
