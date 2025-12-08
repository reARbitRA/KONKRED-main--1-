'use client';

import ToolCard from '@/components/ToolCard';
import { Tool } from '@/lib/types';
import { motion } from 'framer-motion';
import { LEDIndicator } from '@/components/motion/MotionComponents';

const tools: Tool[] = [
  {
    name: 'Valuation Terminal',
    description: 'Values Executive Protocols using industry-standard methodologies and market comparables. Calculate fair market value, ROI projections, and investment recommendations.',
    accessLevel: 'Free',
    href: 'https://example.com/valuation-terminal'
  },
  {
    name: 'Protocol Documenter',
    description: 'Creates structured documentation for any protocol with automated formatting, version control, and export capabilities. Generate technical docs and user guides.',
    accessLevel: 'Pro',
    href: 'https://example.com/protocol-documenter'
  },
  {
    name: 'Artifact Foundry',
    description: 'Generates multiple outputs from one protocol execution with configurable variations. Create batch reports, alternative formats, and derivative content.',
    accessLevel: 'Pro',
    href: 'https://example.com/artifact-foundry'
  },
  {
    name: 'Evolve Studio',
    description: 'Makes outputs interactive and iterative with real-time feedback loops. Transform static results into dynamic, user-controlled experiences.',
    accessLevel: 'Included with protocol acquisition',
    href: 'https://example.com/evolve-studio'
  }
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-5xl font-bold text-text-primary mb-4 tracking-wide">
                Integrated Tools
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-accent-gold to-transparent mb-4" />
              <p className="font-body text-lg text-text-secondary max-w-3xl leading-relaxed">
                Professional tools that enhance the value and capabilities of your Executive Protocols. 
                Each tool is designed to integrate seamlessly with your protocol ecosystem.
              </p>
            </div>
            <div className="hidden lg:flex">
              <LEDIndicator color="green" label="4 MODULES" />
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Integration Panel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="panel-frame p-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6 tracking-wide">
                  Protocol Integration System
                </h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-accent-red to-transparent mb-6" />
              </motion.div>

              <motion.p 
                className="text-text-secondary mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                All tools are designed to work seamlessly with Executive Protocols. Simply acquire a protocol 
                and gain immediate access to the corresponding tool features. Protocols include pre-configured 
                integration settings and authentication tokens.
              </motion.p>
              
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {[
                  { title: 'Single Sign-On', desc: 'Use your vault credentials to access all tools', status: 'green' as const },
                  { title: 'Data Sync', desc: 'Protocol data automatically syncs across tools', status: 'amber' as const },
                  { title: 'API Access', desc: 'Programmatic access through unified REST APIs', status: 'green' as const },
                  { title: 'Enterprise Support', desc: 'Priority support for enterprise packages', status: 'red' as const }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="panel-frame bg-primary/50 p-4 border border-border/50 hover:border-accent-red/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-sm font-semibold text-text-primary">
                        {feature.title}
                      </h3>
                      <LEDIndicator color={feature.status} />
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Status Console */}
              <motion.div
                className="mt-8 bg-primary/50 border border-border rounded p-4 font-mono text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <span className="text-terminal-green">INTEGRATION:</span>
                    <span className="text-accent-red ml-2">ACTIVE</span>
                  </div>
                  <div>
                    <span className="text-terminal-green">PROTOCOLS:</span>
                    <span className="text-text-primary ml-2">3 SYNCED</span>
                  </div>
                  <div>
                    <span className="text-terminal-green">TOOLS:</span>
                    <span className="text-text-primary ml-2">4 ONLINE</span>
                  </div>
                  <div>
                    <span className="text-terminal-green">STATUS:</span>
                    <motion.span 
                      className="text-accent-gold ml-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ● OPERATIONAL
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Terminal Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.2 }}
        >
          <div className="inline-block px-6 py-3 border border-border/50">
            <div className="flex items-center space-x-6 text-xs text-text-secondary font-mono">
              <span>TOOLS_VERSION: v2.0.1</span>
              <span>•</span>
              <span>LAST_SYNC: 2024.01.15</span>
              <span>•</span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ● ALL_SYSTEMS_GO
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}