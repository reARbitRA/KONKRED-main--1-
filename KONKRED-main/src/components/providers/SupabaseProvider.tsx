'use client';

import { createClient } from '@supabase/supabase-js';
import { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

type SupabaseContextType = {
  supabase: SupabaseClient | null;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
};

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  user: null,
  session: null,
  isLoading: true,
  isConfigured: false,
});

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = useMemo(() => {
    if (supabaseUrl && supabaseAnonKey) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
    return null;
  }, []);

  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo(() => ({
    supabase,
    user,
    session,
    isLoading,
    isConfigured,
  }), [supabase, user, session, isLoading, isConfigured]);

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  return context;
}

export function useUser() {
  const { user, isLoading } = useContext(SupabaseContext);
  return { user, isLoading };
}

export function useSession() {
  const { session, isLoading } = useContext(SupabaseContext);
  return { session, isLoading };
}

export function useSupabaseClient() {
  const { supabase, isConfigured } = useContext(SupabaseContext);
  if (!isConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }
  return supabase;
}
