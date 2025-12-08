'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import { motion } from 'framer-motion';
import { TerminalButton, LEDIndicator, ScanLine } from './motion/MotionComponents';

interface AuthFormProps {
  mode: 'enter' | 'join';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  
  const { supabase, isConfigured } = useSupabase();
  const router = useRouter();

  // Stop scanning after initial animation
  useState(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured || !supabase) {
      setError('Authentication system not configured. Please contact administrator.');
      return;
    }
    
    setLoading(true);
    setError(null);

    if (mode === 'join' && password !== confirmPassword) {
      setError('Authentication mismatch detected');
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
    } catch (error: any) {
      setError(`System error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'enter' ? 'Enter the vault.' : 'Join to acquire Executive Protocols.';
  const buttonText = mode === 'enter' ? 'Enter' : 'Join';
  const toggleText = mode === 'enter' 
    ? "Access credentials required. " 
    : "System access granted. ";
  const toggleLink = mode === 'enter' ? '/join' : '/enter';
  const toggleLinkText = mode === 'enter' ? 'Register' : 'Authenticate';

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background security effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-accent-red rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-accent-gold rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div 
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Security gate frame */}
        <div className="panel-frame auth-gate p-8 relative">
          {/* Scanning line effect */}
          {isScanning && <ScanLine className="opacity-50" />}
          
          {/* Status indicators */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <LEDIndicator 
              color={mode === 'enter' ? 'amber' : 'green'} 
              label={mode === 'enter' ? 'SECURE' : 'REGISTER'}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-heading text-2xl font-bold text-text-primary mb-2 tracking-wide">
              {title}
            </h1>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-red to-transparent" />
          </motion.div>
          
          {/* Error display */}
          {error && (
            <motion.div
              className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 mb-6 font-mono text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <LEDIndicator color="red" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-text-secondary text-sm mb-2 font-mono uppercase tracking-wide">
                Identity Protocol
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-primary/50 border border-border text-text-primary px-4 py-3 rounded focus:outline-none focus:border-accent-red focus:shadow-glow-red transition-all duration-300 font-mono"
                placeholder="user@system.exec"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-text-secondary text-sm mb-2 font-mono uppercase tracking-wide">
                Access Key
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-primary/50 border border-border text-text-primary px-4 py-3 rounded focus:outline-none focus:border-accent-red focus:shadow-glow-red transition-all duration-300 font-mono"
                placeholder="••••••••"
              />
            </motion.div>
            
            {mode === 'join' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="confirmPassword" className="block text-text-secondary text-sm mb-2 font-mono uppercase tracking-wide">
                  Confirm Access Key
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-primary/50 border border-border text-text-primary px-4 py-3 rounded focus:outline-none focus:border-accent-red focus:shadow-glow-red transition-all duration-300 font-mono"
                  placeholder="••••••••"
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <TerminalButton
                type="submit"
                disabled={loading}
                loading={loading}
                className="w-full text-lg"
              >
                {loading ? 'AUTHENTICATING...' : buttonText}
              </TerminalButton>
            </motion.div>
          </motion.form>
          
          {/* Toggle link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-text-secondary text-sm font-mono">
              {toggleText}
            </span>
            <a 
              href={toggleLink} 
              className="text-accent-red hover:text-accent-gold transition-colors text-sm font-mono ml-1"
            >
              {toggleLinkText}
            </a>
          </motion.div>

          {/* Security badge */}
          <motion.div
            className="absolute bottom-4 left-4 text-xs text-text-secondary font-mono opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
          >
            SECURE CONNECTION v2.0
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
