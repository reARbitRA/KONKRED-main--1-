import Link from 'next/link';
import ProtocolCard from '@/components/ProtocolCard';
import ToolCard from '@/components/ToolCard';
import { Protocol, Tool } from '@/lib/types';

// Sample featured protocols
const featuredProtocols: Protocol[] = [
  {
    id: '1',
    slug: 'financial-analysis-protocol',
    title: 'Financial Analysis Protocol',
    tagline: 'Automated financial statement analysis with executive summaries',
    description: 'Comprehensive financial analysis protocol.',
    price_cents: 25000,
    industry: 'Finance',
    complexity: 'advanced',
    sample_output: '{}',
    whats_included: ['Core Protocol', 'Input Schema', 'Output Schema'],
    file_url: '',
    created_at: '2024-01-15T00:00:00Z',
    is_featured: true
  },
  {
    id: '2',
    slug: 'saas-metrics-protocol',
    title: 'SaaS Metrics Protocol',
    tagline: 'Real-time SaaS performance monitoring and forecasting',
    description: 'Advanced SaaS metrics analysis protocol.',
    price_cents: 49000,
    industry: 'SaaS',
    complexity: 'enterprise',
    sample_output: '{}',
    whats_included: ['Core Protocol', 'Metrics Engine', 'Forecasting'],
    file_url: '',
    created_at: '2024-01-10T00:00:00Z',
    is_featured: true
  },
  {
    id: '3',
    slug: 'compliance-audit-protocol',
    title: 'Compliance Audit Protocol',
    tagline: 'Automated regulatory compliance assessment and reporting',
    description: 'Enterprise-grade compliance audit protocol.',
    price_cents: 99000,
    industry: 'Compliance',
    complexity: 'enterprise',
    sample_output: '{}',
    whats_included: ['Core Protocol', 'Multi-framework Assessment'],
    file_url: '',
    created_at: '2024-01-05T00:00:00Z',
    is_featured: true
  }
];

const tools: Tool[] = [
  {
    name: 'Valuation Terminal',
    description: 'Calculate economic value of any protocol using industry-standard methodologies.',
    accessLevel: 'Free',
    href: 'https://example.com/valuation'
  },
  {
    name: 'Protocol Documenter',
    description: 'Generate structured documentation for any protocol automatically.',
    accessLevel: 'Pro',
    href: 'https://example.com/documenter'
  },
  {
    name: 'Artifact Foundry',
    description: 'Generate multiple outputs from a single protocol execution.',
    accessLevel: 'Pro',
    href: 'https://example.com/foundry'
  },
  {
    name: 'Evolve Studio',
    description: 'Transform static outputs into interactive experiences.',
    accessLevel: 'Pro',
    href: 'https://example.com/evolve'
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="mb-24">
        <div className="relative">
          {/* Background texture */}
          <div className="absolute inset-0 texture-circuit opacity-20" />
          
          {/* Main hero panel */}
          <div className="relative shadow-stack">
            <div className="relative bg-[#0a0a0a] border-2 border-[#2a2a2a] overflow-hidden">
              
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-[#ff2a2a] via-[#ff6b00] to-[#d4a012]" />
              
              {/* Laser effect */}
              <div className="laser-top" />
              
              {/* Ray burst */}
              <div className="ray-burst opacity-20" />
              
              {/* Content */}
              <div className="relative z-10 p-12 md:p-16">
                {/* System status */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center space-x-2 px-3 py-1 border border-[#2a2a2a] bg-[#0f0f0f]">
                    <div className="led led-sm led-green" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#606060]">
                      SYSTEM ONLINE
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 border border-[#2a2a2a] bg-[#0f0f0f]">
                    <div className="led led-sm led-orange" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#606060]">
                      800+ PROTOCOLS
                    </span>
                  </div>
                </div>
                
                {/* Main title */}
                <h1 className="mb-6">
                  <span 
                    className="block font-mono text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none glitch-text"
                    data-text="EXECUTIVE"
                  >
                    EXECUTIVE
                  </span>
                  <span className="block font-mono text-5xl md:text-7xl font-bold text-[#ff2a2a] tracking-tighter leading-none text-glow-red mt-2">
                    PROTOCOLS
                  </span>
                </h1>
                
                {/* Accent line */}
                <div className="h-[2px] w-32 bg-gradient-to-r from-[#ff2a2a] to-transparent mb-8" />
                
                {/* Description */}
                <p className="text-[#a0a0a0] font-mono text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                  Production-ready AI execution systems. Structured inputs. 
                  Validated outputs. Enterprise-grade reliability.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/protocols" className="group relative">
                    <div className="absolute inset-0 bg-[#ff2a2a] translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                    <div className="relative px-8 py-4 bg-[#ff2a2a] text-black font-mono text-sm uppercase tracking-[0.15em] font-bold border-2 border-[#ff2a2a] hover:bg-black hover:text-[#ff2a2a] transition-colors">
                      Browse Protocols
                    </div>
                  </Link>
                  
                  <Link 
                    href="/tools"
                    className="px-8 py-4 border-2 border-[#2a2a2a] font-mono text-sm uppercase tracking-[0.15em] text-[#a0a0a0] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                  >
                    View Tools
                  </Link>
                </div>
              </div>
              
              {/* Corner cut */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#020202]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#020202]" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
            </div>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════════
          FEATURED PROTOCOLS
          ═══════════════════════════════════════════ */}
      <section className="mb-24">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="led led-sm led-red" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060]">
                FEATURED
              </span>
            </div>
            <h2 className="font-mono text-3xl font-bold text-white tracking-tight">
              Executive Protocols
            </h2>
            <div className="h-[2px] w-24 bg-[#ff2a2a] mt-3" />
          </div>
          
          <Link 
            href="/protocols"
            className="hidden md:flex items-center space-x-2 text-[#a0a0a0] hover:text-[#ff2a2a] transition-colors font-mono text-sm uppercase tracking-wider"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>
        
        {/* Protocol grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {featuredProtocols.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      </section>
      
      {/* ═══════════════════════════════════════════
          TOOLS
          ═══════════════════════════════════════════ */}
      <section className="mb-24">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="led led-sm led-cyan" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#606060]">
                INTEGRATED
              </span>
            </div>
            <h2 className="font-mono text-3xl font-bold text-white tracking-tight">
              Tool Modules
            </h2>
            <div className="h-[2px] w-24 bg-[#00f0ff] mt-3" />
          </div>
        </div>
        
        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </section>
      
      {/* ═══════════════════════════════════════════
          FOOTER STATUS BAR
          ═══════════════════════════════════════════ */}
      <section>
        <div className="panel-inset p-6 texture-dots">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="led led-sm led-green led-static" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#606060]">
                  SYSTEM OPERATIONAL
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="led led-sm led-orange led-static" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#606060]">
                  {featuredProtocols.length} FEATURED
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="led led-sm led-cyan led-static" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#606060]">
                  {tools.length} TOOLS
                </span>
              </div>
            </div>
            
            <div className="text-[10px] font-mono text-[#404040] uppercase tracking-wider">
              KONKRED EXECUTION INFRASTRUCTURE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}