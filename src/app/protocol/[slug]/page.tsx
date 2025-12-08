import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database';
import AcquireButton from '@/components/AcquireButton';
import OutputPreview from '@/components/OutputPreview';

export const dynamic = 'force-dynamic';

interface ProtocolPageProps {
  params: {
    slug: string;
  };
}

export default async function ProtocolPage({ params }: ProtocolPageProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    notFound();
  }
  
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data: protocol, error } = await supabase
    .from('protocols')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !protocol) {
    notFound();
  }

  const { data: { session } } = await supabase.auth.getSession();
  let isAcquired = false;
  
  if (session) {
    const { data: acquisition } = await supabase
      .from('acquisitions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('protocol_id', protocol.id)
      .single();
    
    isAcquired = !!acquisition;
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'standard':
        return 'text-text-secondary';
      case 'advanced':
        return 'text-accent';
      case 'enterprise':
        return 'text-orange-400';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="font-heading text-4xl font-bold text-text-primary mb-2">
                {protocol.title}
              </h1>
              <p className="text-text-secondary text-lg">{protocol.tagline}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary mb-1">
                {formatPrice(protocol.price_cents)}
              </div>
              <div className="text-text-secondary text-sm uppercase mb-2">
                {protocol.industry}
              </div>
              <span className={`text-sm uppercase tracking-wide ${getComplexityColor(protocol.complexity)}`}>
                {protocol.complexity}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <AcquireButton 
              protocolId={protocol.id}
              protocolSlug={protocol.slug}
              isAcquired={isAcquired}
              fileUrl={protocol.file_url}
            />
          </div>
        </div>

        {/* What it executes */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            What it executes
          </h2>
          <div className="bg-secondary border border-border p-6">
            <p className="text-text-secondary leading-relaxed">
              {protocol.description}
            </p>
          </div>
        </section>

        {/* Execution Output Preview */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Execution Output Preview
          </h2>
          <OutputPreview sampleOutput={protocol.sample_output || 'Sample output not available.'} />
        </section>

        {/* What's included */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            What's included
          </h2>
          <div className="bg-secondary border border-border p-6">
            <ul className="space-y-2">
              {protocol.whats_included?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Requirements
          </h2>
          <div className="bg-secondary border border-border p-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-text-secondary">AI model access (OpenAI GPT-4 or equivalent)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-text-secondary">Node.js 16+ or Python 3.8+ runtime environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-text-secondary">API keys for external services (where applicable)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-text-secondary">Basic understanding of structured data formats (JSON)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-secondary border border-border p-8 text-center">
          <h3 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Ready to execute?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Acquire this Executive Protocol to integrate production-ready AI execution into your workflow.
          </p>
          <AcquireButton 
            protocolId={protocol.id}
            protocolSlug={protocol.slug}
            isAcquired={isAcquired}
            fileUrl={protocol.file_url}
          />
        </section>
      </div>
    </div>
  );
}
