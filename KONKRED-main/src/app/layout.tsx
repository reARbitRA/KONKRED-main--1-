import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { SupabaseProvider } from '@/components/providers/SupabaseProvider';

export const metadata: Metadata = {
  title: 'KONKRED - Executive Protocols',
  description: 'Production-ready AI execution systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SupabaseProvider>
          {/* Global laser scan */}
          <div className="laser-global" />
          
          {/* Ambient glow background */}
          <div className="ambient-glow" />
          
          <div className="min-h-screen relative z-10">
            <Nav />
            <main className="pb-20">
              {children}
            </main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}