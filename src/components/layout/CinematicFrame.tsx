'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { ScanLine } from '../motion/MotionComponents';

interface CinematicFrameProps {
  children: ReactNode;
  className?: string;
}

export default function CinematicFrame({ children, className = '' }: CinematicFrameProps) {
  useEffect(() => {
    // Add ambient animation class to body
    document.body.classList.add('cinematic-mode');
    
    return () => {
      document.body.classList.remove('cinematic-mode');
    };
  }, []);

  return (
    <div className={`min-h-screen bg-primary relative overflow-hidden ${className}`}>
      {/* Background gradient overlays */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-red rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold rounded-full filter blur-3xl" />
      </div>

      {/* Main content with frame */}
      <motion.div
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top frame border */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Side frame borders */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent-red to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.div
          className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent-red to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Bottom frame border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Scanning line effect */}
        <ScanLine />

        {/* Main content container */}
        <div className="relative z-20 p-4 md:p-8">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .cinematic-mode {
          background: linear-gradient(135deg, #050608 0%, #101218 50%, #151821 100%);
        }
      `}</style>
    </div>
  );
}