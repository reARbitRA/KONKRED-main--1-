'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProtocolCard from '@/components/ProtocolCard';
import ToolCard from '@/components/ToolCard';
import { Protocol, Tool } from '@/lib/types';
import { GlowingText, TerminalButton, LEDIndicator } from '@/components/motion/MotionComponents';

// Featured protocols data
const featuredProtocols: Protocol[] = [
  {
    id: '1',
    slug: 'financial-analysis-protocol',
    title: 'Financial Analysis Protocol',
    tagline: 'Automated financial statement analysis with executive summaries',
    description: 'Comprehensive financial analysis protocol that processes balance sheets, income statements, and cash flow statements to generate detailed executive summaries and risk assessments.',
    price_cents: 25000,
    industry: 'Finance',
    complexity: 'advanced',
    sample_output: JSON.stringify({
      analysis_id: "FA-2024-001",
      company: "Acme Corp",
      period: "Q4 2023",
      revenue_growth: "+23.5%",
      profit_margin: "18.7%",
      risk_score: "Low",
      recommendations: [
        "Expand into Asian markets",
        "Optimize supply chain costs",
        "Consider strategic acquisitions"
      ]
    }, null, 2),
    whats_included: [
      'Core Executive Protocol',
      'Input schema definitions',
      'Output schema specifications',
      'Financial data validation rules',
      'Risk assessment framework',
      'Executive summary templates',
      'Compliance documentation'
    ],
    file_url: 'https://example.com/protocols/financial-analysis-protocol.zip',
    created_at: '2024-01-15T00:00:00Z',
    is_featured: true
  },
  {
    id: '2',
    slug: 'saas-metrics-protocol',
    title: 'SaaS Metrics Protocol',
    tagline: 'Real-time SaaS performance monitoring and forecasting',
    description: 'Advanced SaaS metrics analysis protocol that calculates churn, LTV, CAC, and generates growth forecasts based on historical performance data.',
    price_cents: 49000,
    industry: 'SaaS',
    complexity: 'enterprise',
    sample_output: JSON.stringify({
      metrics_period: "January 2024",
      monthly_recurring_revenue: "$2.4M",
      annual_recurring_revenue: "$28.8M",
      customer_acquisition_cost: "$450",
      lifetime_value: "$12,500",
      ltv_cac_ratio: "27.8",
      churn_rate: "2.1%",
      net_revenue_retention: "118%",
      forecast_mrr_next_quarter: "$2.7M"
    }, null, 2),
    whats_included: [
      'Core Executive Protocol',
      'SaaS metrics calculation engine',
      'Forecasting algorithms',
      'Benchmark data sets',
      'Performance dashboards',
      'Alert configurations',
      'Integration documentation'
    ],
    file_url: 'https://example.com/protocols/saas-metrics-protocol.zip',
    created_at: '2024-01-10T00:00:00Z',
    is_featured: true
  },
  {
    id: '3',
    slug: 'compliance-audit-protocol',
    title: 'Compliance Audit Protocol',
    tagline: 'Automated regulatory compliance assessment and reporting',
    description: 'Enterprise-grade compliance audit protocol that evaluates systems against GDPR, SOC 2, and ISO 27001 standards.',
    price_cents: 99000,
    industry: 'Compliance',
    complexity: 'enterprise',
    sample_output: JSON.stringify({
      audit_id: "CA-2024-001",
      framework: "SOC 2 Type II",
      audit_date: "2024-01-20",
      compliance_score: "87%",
      critical_findings: 0,
      recommendations: [
        "Implement multi-factor authentication",
        "Enhance logging capabilities",
        "Update incident response procedures"
      ]
    }, null, 2),
    whats_included: [
      'Core Executive Protocol',
      'Multi-framework assessment engine',
      'Control evaluation criteria',
      'Remediation workflow templates',
      'Audit report generators'
    ],
    file_url: 'https://example.com/protocols/compliance-audit-protocol.zip',
    created_at: '2024-01-05T00:00:00Z',
    is_featured: true
  }
];

const tools: Tool[] = [
  {
    name: 'Valuation Terminal',
    description: 'Values Executive Protocols using industry-standard methodologies and market comparables.',
    accessLevel: 'Free',
    href: 'https://example.com/valuation-terminal'
  },
  {
    name: 'Protocol Documenter',
    description: 'Creates structured documentation for any protocol with automated formatting.',
    accessLevel: 'Pro',
    href: 'https://example.com/protocol-documenter'
  },
  {
    name: 'Artifact Foundry',
    description: 'Generates multiple outputs from one protocol execution with variations.',
    accessLevel: 'Pro',
    href: 'https://example.com/artifact-foundry'
  },
  {
    name: 'Evolve Studio',
    description: 'Makes outputs interactive and iterative with real-time feedback loops.',
    accessLevel: 'Included with protocol acquisition',
    href: 'https://example.com/evolve-studio'
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className="font-heading text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <GlowingText>
              Executive Protocols.
            </GlowingText>
            <br />
            <span className="text-text-secondary">
              Production-ready AI systems.
            </span>
          </motion.h1>
          
          <motion.p 
            className="font-body text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Marketplace for AI execution systems with structured outputs, 
            compliance frameworks, and enterprise-grade reliability.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/protocols">
              <TerminalButton className="text-lg px-8 py-3">
                Browse protocols
              </TerminalButton>
            </Link>
            <Link href="/enter">
              <motion.button
                className="border border-accent-gold text-accent-gold px-8 py-3 rounded-button font-heading text-sm uppercase tracking-wide transition-all duration-300 hover:bg-accent-gold hover:text-primary hover:shadow-glow-gold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enter
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Status indicators */}
        <motion.div
          className="flex justify-center space-x-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <LEDIndicator color="green" label="ONLINE" />
          <LEDIndicator color="amber" label="ACTIVE" />
          <LEDIndicator color="red" label="SECURED" />
        </motion.div>
      </motion.section>

      {/* Featured Protocols Section */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-2 tracking-wide">
                Featured Executive Protocols
              </h2>
              <div className="h-0.5 w-32 bg-gradient-to-r from-accent-red to-transparent" />
            </div>
            <LEDIndicator color="amber" label="3 SYSTEMS" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProtocols.map((protocol, index) => (
              <ProtocolCard 
                key={protocol.id} 
                protocol={protocol} 
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Link 
              href="/protocols"
              className="text-text-secondary hover:text-accent-red transition-colors font-mono text-sm uppercase tracking-wide inline-flex items-center space-x-2"
            >
              <span>View all protocols</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-2 tracking-wide">
                Integrated Tools
              </h2>
              <div className="h-0.5 w-32 bg-gradient-to-r from-accent-gold to-transparent" />
            </div>
            <LEDIndicator color="green" label="4 MODULES" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} index={index} />
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Terminal footer */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        <div className="panel-frame bg-primary/50 inline-block px-6 py-3">
          <div className="flex items-center space-x-6 text-xs text-text-secondary font-mono">
            <span>SYSTEM STATUS: OPERATIONAL</span>
            <span>•</span>
            <span>PROTOCOLS: {featuredProtocols.length}</span>
            <span>•</span>
            <span>TOOLS: {tools.length}</span>
            <span>•</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ● SECURE CONNECTION
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}