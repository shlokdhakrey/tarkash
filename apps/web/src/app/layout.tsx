import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnovateX 2025 | College of Engineering',
  description: 'Official hackathon platform for InnovateX 2025 - College of Engineering',
  keywords: ['hackathon', 'InnovateX', 'College of Engineering', '2025'],
  authors: [{ name: 'InnovateX Team' }],
  openGraph: {
    title: 'InnovateX 2025',
    description: 'Join the biggest hackathon of 2025',
    type: 'website',
    locale: 'en_US',
    siteName: 'InnovateX 2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnovateX 2025',
    description: 'Join the biggest hackathon of 2025',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7c3aed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
