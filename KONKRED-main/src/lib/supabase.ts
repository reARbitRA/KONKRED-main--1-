import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database';

let _supabase: SupabaseClient<Database> | null = null;
let _supabaseAdmin: SupabaseClient<Database> | null = null;

function getEnvVars() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getEnvVars();
  return !!(url && anonKey);
}

export function getSupabase(): SupabaseClient<Database> | null {
  const { url, anonKey } = getEnvVars();
  
  if (!url || !anonKey) {
    return null;
  }
  
  if (!_supabase) {
    _supabase = createClient<Database>(url, anonKey);
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient<Database> | null {
  const { url, serviceRoleKey } = getEnvVars();
  
  if (!url || !serviceRoleKey) {
    return null;
  }
  
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _supabaseAdmin;
}

export const supabase = null;
export const supabaseAdmin = null;

export default supabase;
