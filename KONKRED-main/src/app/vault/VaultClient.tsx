'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import { useRouter } from 'next/navigation';

interface VaultClientProps {
  acquisitions: any[];
  toolAccess: any[];
  user: any;
}

export default function VaultClient({ acquisitions, toolAccess, user }: VaultClientProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    if (!supabase) return;
    
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  const allTools = [
    { name: 'Valuation Terminal', href: 'https://example.com/valuation-terminal', defaultAccess: 'free' },
    { name: 'Protocol Documenter', href: 'https://example.com/protocol-documenter', defaultAccess: 'pro' },
    { name: 'Artifact Foundry', href: 'https://example.com/artifact-foundry', defaultAccess: 'pro' },
    { name: 'Evolve Studio', href: 'https://example.com/evolve-studio', defaultAccess: 'none' },
  ];

  const getAccessLevel = (toolName: string) => {
    const access = toolAccess.find(t => t.tool_name === toolName);
    if (access) return access.access_level;
    
    const tool = allTools.find(t => t.name === toolName);
    return tool?.defaultAccess || 'none';
  };

  const getAccessBadgeColor = (accessLevel: string) => {
    switch (accessLevel) {
      case 'free':
        return 'bg-green-900 text-green-200';
      case 'pro':
        return 'bg-blue-900 text-blue-200';
      case 'unlimited':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-secondary text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-heading text-4xl font-bold text-text-primary mb-2">
              Your Vault
            </h1>
            <p className="text-text-secondary">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Exit'}
          </button>
        </div>

        {/* Acquired Protocols */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Acquired Protocols
          </h2>
          
          {acquisitions.length === 0 ? (
            <div className="bg-secondary border border-border p-8 text-center">
              <p className="text-text-secondary mb-4">
                You haven't acquired any protocols yet.
              </p>
              <Link 
                href="/protocols"
                className="bg-accent text-primary px-6 py-2 hover:bg-gray-200 transition-colors"
              >
                Browse protocols
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acquisitions.map((acquisition) => (
                <div key={acquisition.id} className="bg-secondary border border-border p-6">
                  <div className="mb-4">
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                      {acquisition.protocols.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">
                      {acquisition.protocols.tagline}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase text-text-secondary">
                        {acquisition.protocols.industry}
                      </span>
                      <span className={`text-xs uppercase ${getComplexityColor(acquisition.protocols.complexity)}`}>
                        {acquisition.protocols.complexity}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mb-2">
                      Acquired {formatDate(acquisition.acquired_at)}
                    </p>
                    <p className="text-sm text-text-primary">
                      {formatPrice(acquisition.protocols.price_cents)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    {acquisition.protocols.file_url ? (
                      <a
                        href={acquisition.protocols.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-accent text-primary text-center py-2 hover:bg-gray-200 transition-colors"
                      >
                        Download
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-secondary text-text-secondary text-center py-2 opacity-50 cursor-not-allowed"
                      >
                        File unavailable
                      </button>
                    )}
                    <Link 
                      href={`/protocol/${acquisition.protocols.slug}`}
                      className="flex-1 border border-accent text-accent text-center py-2 hover:bg-accent hover:text-primary transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tool Access */}
        <section>
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Tool Access
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTools.map((tool) => {
              const accessLevel = getAccessLevel(tool.name);
              const hasAccess = accessLevel !== 'none';
              
              return (
                <div key={tool.name} className="bg-secondary border border-border p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {tool.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 ${getAccessBadgeColor(accessLevel)}`}>
                      {accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-4">
                    {tool.name === 'Valuation Terminal' && 'Values Executive Protocols using industry-standard methodologies.'}
                    {tool.name === 'Protocol Documenter' && 'Creates structured documentation for any protocol.'}
                    {tool.name === 'Artifact Foundry' && 'Generates multiple outputs from one protocol execution.'}
                    {tool.name === 'Evolve Studio' && 'Makes outputs interactive and iterative.'}
                  </p>

                  {hasAccess ? (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-accent text-primary text-center py-2 hover:bg-gray-200 transition-colors"
                    >
                      Access
                    </a>
                  ) : (
                    <button
                      disabled
                      className="block w-full bg-secondary text-text-secondary text-center py-2 opacity-50 cursor-not-allowed"
                    >
                      No access
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
