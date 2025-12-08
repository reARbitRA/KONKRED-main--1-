import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { nowpayments, NOWIPN } from '@/lib/nowpayments';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('x-nowpayments-sig')!;

  try {
    // Validate IPN signature
    const isValid = nowpayments.validateIPNSignature(body, signature, headers().get('x-nowpayments-sig')!);
    
    if (!isValid) {
      console.error('Invalid IPN signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Parse the IPN payload
    const ipn: NOWIPN = nowpayments.parseIPN(body);

    // Extract order information
    const { payment_id, order_id, payment_status } = ipn;

    // Parse order_id to get user_id and protocol_id
    // Expected format: "user_id_protocol_id_timestamp"
    const [userId, protocolId] = order_id.split('_');

    if (!userId || !protocolId) {
      console.error('Invalid order_id format:', order_id);
      return new Response('OK', { status: 200 }); // Still return OK to avoid retries
    }

    const supabase = getSupabaseAdmin();
    
    if (!supabase) {
      console.error('Supabase admin client not configured');
      return new Response('OK', { status: 200 });
    }

    // Check if acquisition already exists
    const { data: existingAcquisition } = await supabase
      .from('acquisitions')
      .select('*')
      .eq('nowpayments_payment_id', payment_id)
      .single();

    if (existingAcquisition) {
      // Update existing acquisition
      const { error: updateError } = await supabase
        .from('acquisitions')
        .update({
          payment_status: payment_status,
          acquired_at: payment_status === 'finished' ? new Date().toISOString() : existingAcquisition.acquired_at,
        } as any)
        .eq('nowpayments_payment_id', payment_id);

      if (updateError) {
        console.error('Error updating acquisition:', updateError);
      }
    } else {
      // Create new acquisition record
      const { error: insertError } = await supabase
        .from('acquisitions')
        .insert({
          user_id: userId,
          protocol_id: protocolId,
          nowpayments_payment_id: payment_id,
          payment_status: payment_status,
        } as any);

      if (insertError) {
        console.error('Error creating acquisition:', insertError);
      }
    }

    console.log(`Processed IPN: payment_id=${payment_id}, status=${payment_status}, user_id=${userId}, protocol_id=${protocolId}`);

    // Return success response
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error processing IPN:', error);
    return new Response('OK', { status: 200 }); // Always return OK to avoid webhook retries
  }
}
