import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Acezon — Academic Assistance & Homework Help',
  description: 'Expert academic assistance to help students achieve the grades they deserve. Available 24/7.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased selection:bg-blue-500/20 selection:text-blue-700`}>
        {children}
      </body>
    </html>
  );
}
