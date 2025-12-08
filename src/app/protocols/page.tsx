'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import ProtocolCard from '@/components/ProtocolCard';
import { Protocol } from '@/lib/types';

export default function ProtocolsPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: 'all',
    priceRange: 'all',
    complexity: 'all',
  });

  const { supabase, isConfigured } = useSupabase();

  useEffect(() => {
    fetchProtocols();
  }, [supabase, isConfigured]);

  useEffect(() => {
    filterProtocols();
  }, [protocols, filters]);

  const fetchProtocols = async () => {
    if (!supabase || !isConfigured) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('protocols')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProtocols(data || []);
    } catch (error) {
      console.error('Error fetching protocols:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProtocols = () => {
    let filtered = [...protocols];

    if (filters.industry !== 'all') {
      filtered = filtered.filter(p => p.industry === filters.industry);
    }

    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.price_cents;
        switch (filters.priceRange) {
          case 'low':
            return price < 20000;
          case 'medium':
            return price >= 20000 && price < 50000;
          case 'high':
            return price >= 50000;
          default:
            return true;
        }
      });
    }

    if (filters.complexity !== 'all') {
      filtered = filtered.filter(p => p.complexity === filters.complexity);
    }

    setFilteredProtocols(filtered);
  };

  const industries = Array.from(new Set(protocols.map(p => p.industry).filter(Boolean)));
  const complexities = ['standard', 'advanced', 'enterprise'];

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-text-secondary">Loading protocols...</div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-text-secondary">Database not configured. Please set up Supabase credentials.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">
          Executive Protocols
        </h1>

        {/* Filters */}
        <div className="bg-secondary border border-border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-text-secondary text-sm mb-2">Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                className="w-full bg-primary border border-border text-text-primary px-4 py-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full bg-primary border border-border text-text-primary px-4 py-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $200</option>
                <option value="medium">$200 - $500</option>
                <option value="high">$500+</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Complexity</label>
              <select
                value={filters.complexity}
                onChange={(e) => setFilters({ ...filters, complexity: e.target.value })}
                className="w-full bg-primary border border-border text-text-primary px-4 py-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Levels</option>
                {complexities.map(complexity => (
                  <option key={complexity} value={complexity}>
                    {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Protocol Grid */}
        {filteredProtocols.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No protocols found matching your filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProtocols.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
