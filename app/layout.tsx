import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '4U Test - Achievements',
  description: 'Achievements system implementation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

