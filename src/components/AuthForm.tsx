'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabase } from '@/components/providers/SupabaseProvider';

interface AuthFormProps {
  mode: 'enter' | 'join';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { supabase, isConfigured } = useSupabase();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured || !supabase) {
      setError('System not configured. Contact administrator.');
      return;
    }
    
    setLoading(true);
    setError(null);

    if (mode === 'join' && password !== confirmPassword) {
      setError('Access keys do not match.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'enter') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
      
      router.push('/vault');
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'enter' ? 'Enter the vault.' : 'Join to acquire protocols.';
  const buttonText = mode === 'enter' ? 'Enter' : 'Join';

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 texture-grid opacity-30" />
      <div className="ambient-glow" />
      
      {/* Ray burst background */}
      <div className="ray-burst" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Main panel */}
        <div className="relative shadow-stack">
          <div className="relative bg-[#0a0a0a] border-2 border-[#2a2a2a] overflow-hidden">
            
            {/* Top accent bar */}
            <div className="h-[3px] bg-gradient-to-r from-[#ff2a2a] via-[#ff6b00] to-[#d4a012]" />
            
            {/* Laser line */}
            <div className="laser-top" />
            
            {/* Header bar */}
            <div className="h-12 bg-[#0f0f0f] border-b border-[#2a2a2a] flex items-center justify-between px-6 texture-scanlines">
              <div className="flex items-center space-x-3">
                <div className={`led led-sm ${mode === 'enter' ? 'led-orange' : 'led-green'}`} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060]">
                  {mode === 'enter' ? 'AUTHENTICATION' : 'REGISTRATION'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#ff2a2a]">SECURE</span>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {/* Title */}
              <h1 
                className="font-mono text-2xl font-bold text-white mb-2 tracking-tight glitch-text"
                data-text={title}
              >
                {title}
              </h1>
              
              <div className="h-[1px] w-24 bg-[#ff2a2a] mb-8" />
              
              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 border-2 border-[#ff2a2a]/50 bg-[#ff2a2a]/10 text-[#ff2a2a] text-sm font-mono">
                  <div className="flex items-center space-x-2">
                    <div className="led led-sm led-red led-static" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060] mb-2">
                    Identity Protocol
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@system.exec"
                    className="w-full bg-[#0f0f0f] border-2 border-[#2a2a2a] text-white px-4 py-3 font-mono text-sm placeholder-[#404040] focus:outline-none focus:border-[#ff2a2a] transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060] mb-2">
                    Access Key
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f0f] border-2 border-[#2a2a2a] text-white px-4 py-3 font-mono text-sm placeholder-[#404040] focus:outline-none focus:border-[#ff2a2a] transition-colors"
                  />
                </div>
                
                {mode === 'join' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060] mb-2">
                      Confirm Access Key
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f0f] border-2 border-[#2a2a2a] text-white px-4 py-3 font-mono text-sm placeholder-[#404040] focus:outline-none focus:border-[#ff2a2a] transition-colors"
                    />
                  </div>
                )}
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative px-6 py-4 border-2 border-[#ff2a2a] bg-[#ff2a2a] text-black font-mono text-sm uppercase tracking-[0.15em] font-bold hover:bg-transparent hover:text-[#ff2a2a] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                >
                  {/* Loading sweep */}
                  {loading && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ animation: 'laser-horizontal 1s ease-in-out infinite' }}
                    />
                  )}
                  <span className="relative z-10">
                    {loading ? 'AUTHENTICATING...' : buttonText}
                  </span>
                </button>
              </form>
              
              {/* Toggle link */}
              <div className="mt-8 text-center">
                <span className="text-[#606060] text-sm font-mono">
                  {mode === 'enter' ? 'No credentials? ' : 'Already registered? '}
                </span>
                <Link 
                  href={mode === 'enter' ? '/join' : '/enter'}
                  className="text-[#ff2a2a] hover:text-[#ff6b00] transition-colors text-sm font-mono"
                >
                  {mode === 'enter' ? 'Register' : 'Authenticate'}
                </Link>
              </div>
            </div>
            
            {/* Bottom status bar */}
            <div className="h-10 bg-[#0f0f0f] border-t border-[#2a2a2a] flex items-center justify-between px-6">
              <span className="text-[9px] font-mono text-[#404040] uppercase tracking-wider">
                SECURE CONNECTION v2.0
              </span>
              <div className="flex items-center space-x-2">
                <div className="led led-sm led-green led-static" />
                <span className="text-[9px] font-mono text-[#00ff41]">ENCRYPTED</span>
              </div>
            </div>
            
            {/* Corner cuts */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#020202]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#020202]" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}