'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSupabase, useUser } from '@/components/providers/SupabaseProvider';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="relative border-b-2 border-[#2a2a2a] bg-[#0a0a0a] texture-scanlines">
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#ff2a2a] via-[#ff6b00] to-[#d4a012]" />
      
      {/* Laser scan on nav */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
        <div 
          className="h-full w-[30%]"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff2a2a, #fff, #ff2a2a, transparent)',
            boxShadow: '0 0 10px #ff2a2a',
            animation: 'laser-horizontal 6s ease-in-out infinite'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="group flex items-center space-x-3">
              {/* Logo mark */}
              <div className="relative w-8 h-8 border-2 border-[#ff2a2a] bg-[#0f0f0f] flex items-center justify-center group-hover:border-[#ff6b00] transition-colors">
                <div className="w-3 h-3 bg-[#ff2a2a] group-hover:bg-[#ff6b00] transition-colors" />
                {/* Corner cuts */}
                <div className="absolute -top-[2px] -right-[2px] w-2 h-2 bg-[#0a0a0a]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 bg-[#0a0a0a]" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
              </div>
              
              {/* Logo text */}
              <span 
                className="font-mono text-xl font-bold text-white tracking-tight group-hover:text-[#ff2a2a] transition-colors glitch-text"
                data-text="KONKRED"
              >
                KONKRED
              </span>
            </Link>
            
            {/* Nav links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/protocols"
                className={`
                  relative px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all
                  ${isActive('/protocols') 
                    ? 'text-[#ff2a2a] bg-[#ff2a2a]/10' 
                    : 'text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]'
                  }
                `}
              >
                {isActive('/protocols') && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff2a2a]" />
                )}
                Protocols
              </Link>
              
              <Link
                href="/tools"
                className={`
                  relative px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all
                  ${isActive('/tools') 
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10' 
                    : 'text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]'
                  }
                `}
              >
                {isActive('/tools') && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00f0ff]" />
                )}
                Tools
              </Link>
              
              {user && (
                <Link
                  href="/vault"
                  className={`
                    relative px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all
                    ${isActive('/vault') 
                      ? 'text-[#d4a012] bg-[#d4a012]/10' 
                      : 'text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]'
                    }
                  `}
                >
                  {isActive('/vault') && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4a012]" />
                  )}
                  Vault
                </Link>
              )}
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Status indicator */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 border border-[#2a2a2a] bg-[#0f0f0f]">
                  <div className="led led-sm led-green" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#606060]">
                    AUTHENTICATED
                  </span>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 border-2 border-[#2a2a2a] font-mono text-xs uppercase tracking-[0.15em] text-[#a0a0a0] hover:border-[#ff2a2a] hover:text-[#ff2a2a] transition-all"
                >
                  Exit
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/enter"
                  className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-white transition-all"
                >
                  Enter
                </Link>
                <Link 
                  href="/join"
                  className="relative px-4 py-2 border-2 border-[#ff2a2a] font-mono text-xs uppercase tracking-[0.15em] text-[#ff2a2a] hover:bg-[#ff2a2a] hover:text-black transition-all overflow-hidden group"
                >
                  {/* Sweep effect */}
                  <div className="absolute inset-0 bg-[#ff2a2a]/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative z-10">Join</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
        <div 
          className="h-full w-[20%]"
          style={{
            background: 'linear-gradient(90deg, transparent, #d4a012, transparent)',
            boxShadow: '0 0 8px #d4a012',
            animation: 'laser-horizontal 8s ease-in-out infinite reverse'
          }}
        />
      </div>
    </nav>
  );
}