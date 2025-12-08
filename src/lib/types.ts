export interface Protocol {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price_cents: number;
  industry: string;
  complexity: 'standard' | 'advanced' | 'enterprise';
  sample_output: string;
  whats_included: string[];
  file_url: string;
  created_at: string;
  is_featured: boolean;
}

export interface Acquisition {
  id: string;
  user_id: string;
  protocol_id: string;
  stripe_payment_id: string;
  acquired_at: string;
}

export interface ToolAccess {
  id: string;
  user_id: string;
  tool_name: string;
  access_level: 'free' | 'pro' | 'unlimited';
  expires_at?: string;
}

export interface Tool {
  name: string;
  description: string;
  accessLevel: string;
  href: string;
}

export interface User {
  id: string;
  email: string;
}