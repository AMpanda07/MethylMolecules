import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation/Navigation';

export const metadata: Metadata = {
  title: {
    default: 'Methyle Molecule — Explore the World of Chemistry',
    template: '%s | Methyle Molecule',
  },
  description:
    'Discover elements, build molecules, explore real-world chemistry examples, and understand how chemistry shapes our world. An interactive chemistry exploration platform for students.',
  keywords: [
    'chemistry',
    'periodic table',
    'elements',
    'molecules',
    'interactive chemistry',
    'learn chemistry',
    'science education',
  ],
  authors: [{ name: 'Methyle Molecule' }],
  openGraph: {
    title: 'Methyle Molecule — Explore the World of Chemistry',
    description:
      'An interactive chemistry exploration platform for curious students.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F4EC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Fonts — loaded via globals.css @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Navigation />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
