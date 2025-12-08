import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database';
import VaultClient from './VaultClient';

export const dynamic = 'force-dynamic';

export default async function VaultPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    redirect('/enter');
  }
  
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    redirect('/enter');
  }

  const { data: acquisitions, error: acquisitionsError } = await supabase
    .from('acquisitions')
    .select(`
      *,
      protocols (
        id,
        slug,
        title,
        tagline,
        industry,
        complexity,
        created_at,
        price_cents,
        file_url
      )
    `)
    .eq('user_id', session.user.id)
    .order('acquired_at', { ascending: false });

  if (acquisitionsError) {
    console.error('Error fetching acquisitions:', acquisitionsError);
  }

  const { data: toolAccess, error: toolAccessError } = await supabase
    .from('tool_access')
    .select('*')
    .eq('user_id', session.user.id);

  if (toolAccessError) {
    console.error('Error fetching tool access:', toolAccessError);
  }

  return (
    <VaultClient 
      acquisitions={acquisitions || []}
      toolAccess={toolAccess || []}
      user={session.user}
    />
  );
}
