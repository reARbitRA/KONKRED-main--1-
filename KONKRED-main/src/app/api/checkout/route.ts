import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { nowpayments, NOWPaymentRequest } from '@/lib/nowpayments';
import { Database } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    const supabase = createRouteHandlerClient<Database>({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { protocolId } = await request.json();

    if (!protocolId) {
      return NextResponse.json({ error: 'Protocol ID is required' }, { status: 400 });
    }

    const { data: protocol, error: protocolError } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', protocolId)
      .single();

    if (protocolError || !protocol) {
      return NextResponse.json({ error: 'Protocol not found' }, { status: 404 });
    }

    const priceAmount = protocol.price_cents / 100;
    
    const orderId = `${session.user.id}_${protocol.id}_${Date.now()}`;

    const paymentRequest: NOWPaymentRequest = {
      price_amount: priceAmount,
      price_currency: 'usd',
      pay_currency: process.env.NOWPAYMENTS_PAY_CURRENCY || 'usdt',
      order_id: orderId,
      order_description: `Executive Protocol: ${protocol.title}`,
      ipn_callback_url: `${process.env.FRONTEND_BASE_URL}/api/webhook`,
      success_url: `${process.env.FRONTEND_BASE_URL}/vault`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/protocol/${protocol.slug}`,
    };

    const paymentResponse = await nowpayments.createPayment(paymentRequest);

    const { error: acquisitionError } = await supabase
      .from('acquisitions')
      .insert({
        user_id: session.user.id,
        protocol_id: protocol.id,
        nowpayments_payment_id: paymentResponse.payment_id,
        payment_status: 'waiting',
      });

    if (acquisitionError) {
      console.error('Error creating acquisition record:', acquisitionError);
    }

    return NextResponse.json({ 
      url: paymentResponse.purchase_url,
      paymentId: paymentResponse.payment_id 
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
