-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create protocols table
CREATE TABLE protocols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text,
  description text,
  price_cents integer NOT NULL,
  industry text,
  complexity text CHECK (complexity IN ('standard', 'advanced', 'enterprise')),
  sample_output text,
  whats_included text[],
  file_url text,
  created_at timestamp with time zone DEFAULT now(),
  is_featured boolean DEFAULT false
);

-- Create acquisitions table (updated for NOWPayments)
CREATE TABLE acquisitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid references auth.users(id) NOT NULL,
  protocol_id uuid references protocols(id) NOT NULL,
  nowpayments_payment_id text,
  payment_status text CHECK (payment_status IN ('waiting', 'confirming', 'finished', 'failed')),
  acquired_at timestamp with time zone DEFAULT now()
);

-- Create tool_access table
CREATE TABLE tool_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid references auth.users(id) NOT NULL,
  tool_name text NOT NULL,
  access_level text CHECK (access_level IN ('free', 'pro', 'unlimited')),
  expires_at timestamp with time zone
);

-- Create indexes
CREATE INDEX ON protocols (slug);
CREATE INDEX ON acquisitions (user_id);
CREATE INDEX ON acquisitions (nowpayments_payment_id);
CREATE INDEX ON tool_access (user_id);
CREATE INDEX ON protocols (is_featured);
CREATE INDEX ON protocols (industry);
CREATE INDEX ON protocols (complexity);

-- RLS policies
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE acquisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_access ENABLE ROW LEVEL SECURITY;

-- Protocols policies (everyone can read, only authenticated can see details)
CREATE POLICY "Anyone can view protocols" ON protocols FOR SELECT USING (true);

-- Acquisitions policies (users can only see their own acquisitions)
CREATE POLICY "Users can view their own acquisitions" ON acquisitions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own acquisitions" ON acquisitions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tool access policies (users can only see their own tool access)
CREATE POLICY "Users can view their own tool access" ON tool_access FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tool access" ON tool_access FOR INSERT WITH CHECK (auth.uid() = user_id);