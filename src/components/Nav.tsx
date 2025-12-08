'use client';

import Link from 'next/link';
import { useSupabase, useUser } from '@/components/providers/SupabaseProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LEDIndicator } from './motion/MotionComponents';
import { useState } from 'react';

export default function Nav() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/');
  };

  const navItems = [
    { href: '/protocols', label: 'Protocols', status: 'active' as const },
    { href: '/tools', label: 'Tools', status: 'active' as const },
  ];

  if (user) {
    navItems.push({ href: '/vault', label: 'Vault', status: 'active' as const });
  }

  return (
    <motion.nav 
      className="panel-frame mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/" className="font-heading text-xl font-bold text-text-primary relative group">
              <span className="relative z-10">Executive Protocols</span>
              <motion.div
                className="absolute inset-0 bg-accent-red opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded"
              />
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'center' }}
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary transition-colors relative group"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="relative z-10 font-heading text-sm uppercase tracking-wide">
                      {item.label}
                    </span>
                    
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-accent-red"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === item.href ? '100%' : '0%' }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {hoveredItem === item.href && (
                      <motion.div
                        className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-accent-red opacity-20 rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {user ? (
              <div className="flex items-center space-x-4">
                <LEDIndicator 
                  color="green" 
                  label="AUTHENTICATED"
                  className="hidden md:flex"
                />
                <motion.button
                  onClick={handleSignOut}
                  className="terminal-button text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Exit
                </motion.button>
              </div>
            ) : (
              <>
                <Link 
                  href="/enter"
                  className="text-text-secondary hover:text-text-primary transition-colors font-heading text-sm uppercase tracking-wide relative group"
                >
                  <span className="relative z-10">Enter</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <Link 
                  href="/join"
                  className="terminal-button text-sm"
                >
                  Join
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Animated scan line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.nav>
  );
}
