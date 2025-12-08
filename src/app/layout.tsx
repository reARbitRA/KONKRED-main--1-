import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import Nav from '@/components/Nav';
import CinematicFrame from '@/components/layout/CinematicFrame';
import { SupabaseProvider } from '@/components/providers/SupabaseProvider';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Executive Protocols - Production-ready AI systems',
  description: 'Production-ready AI systems with structured outputs and execution-ready protocols.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="font-heading antialiased">
        <SupabaseProvider>
          <div className="min-h-screen bg-primary">
            <Nav />
            <main>
              <CinematicFrame>
                {children}
              </CinematicFrame>
            </main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
