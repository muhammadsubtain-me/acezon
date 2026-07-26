'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAdminTheme } from './admin-theme-provider';
import { Toggle } from '@/components/ui/toggle';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAdminTheme();
  const isDark = theme === 'dark';

  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={isDark}
      onPressedChange={toggleTheme}
      className={className}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-blue-400 transition-transform duration-300 hover:scale-110" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 hover:scale-110" />
      )}
    </Toggle>
  );
}
