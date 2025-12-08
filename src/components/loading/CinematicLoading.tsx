'use client';

import { motion } from 'framer-motion';
import { LEDIndicator, ScanLine } from '../motion/MotionComponents';

interface CinematicLoadingProps {
  message?: string;
}

export default function CinematicLoading({ message = 'INITIALIZING SYSTEM...' }: CinematicLoadingProps) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-accent-red rounded-full filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Loading frame */}
        <div className="panel-frame p-8 max-w-md w-full mx-auto">
          <ScanLine />
          
          {/* Status indicator */}
          <div className="flex justify-center mb-6">
            <LEDIndicator color="amber" label="LOADING" />
          </div>

          {/* Loading message */}
          <motion.div
            className="text-text-primary font-mono text-sm uppercase tracking-wide mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.div>

          {/* Loading bar */}
          <div className="w-full bg-primary/50 border border-border rounded h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-red to-accent-gold"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Terminal cursor */}
          <motion.div
            className="inline-block w-2 h-4 bg-terminal-green mt-6"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* System status */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-text-secondary font-mono">
            <div>PROTOCOL_STATUS: LOADING</div>
            <div>CONNECTION: SECURED</div>
            <div>SYSTEM: ONLINE</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}