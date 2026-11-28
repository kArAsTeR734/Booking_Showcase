import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppProviders } from '@/app/bootstrap';
import '@fontsource-variable/archivo';
import '@fontsource-variable/source-sans-3';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Витрина бронирования проката',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
