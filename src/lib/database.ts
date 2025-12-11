export type Database = {
  public: {
    Tables: {
      protocols: {
        Row: {
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
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          tagline?: string;
          description: string;
          price_cents: number;
          industry?: string;
          complexity?: 'standard' | 'advanced' | 'enterprise';
          sample_output?: string;
          whats_included?: string[];
          file_url?: string;
          created_at?: string;
          is_featured?: boolean;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          tagline?: string;
          description?: string;
          price_cents?: number;
          industry?: string;
          complexity?: 'standard' | 'advanced' | 'enterprise';
          sample_output?: string;
          whats_included?: string[];
          file_url?: string;
          created_at?: string;
          is_featured?: boolean;
        };
      };
      acquisitions: {
        Row: {
          id: string;
          user_id: string;
          protocol_id: string;
          stripe_payment_id?: string | null;     // Made optional/nullable
          nowpayments_payment_id?: string | null; // Added this
          payment_status?: string | null;         // Added this
          acquired_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          protocol_id: string;
          stripe_payment_id?: string | null;
          nowpayments_payment_id?: string | null; // Added this
          payment_status?: string | null;         // Added this
          acquired_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          protocol_id?: string;
          stripe_payment_id?: string | null;
          nowpayments_payment_id?: string | null; // Added this
          payment_status?: string | null;         // Added this
          acquired_at?: string;
        };
      };
      tool_access: {
        Row: {
          id: string;
          user_id: string;
          tool_name: string;
          access_level: 'free' | 'pro' | 'unlimited';
          expires_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_name: string;
          access_level: 'free' | 'pro' | 'unlimited';
          expires_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_name?: string;
          access_level?: 'free' | 'pro' | 'unlimited';
          expires_at?: string;
        };
      };
    };
    Functions: {
      [key: string]: never;
    };
    Enums: {
      [key: string]: never;
    };
  };
};