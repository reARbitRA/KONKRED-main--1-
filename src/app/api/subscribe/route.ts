import { NextResponse } from 'next/server';

const PLAN_IDS: Record<string, { monthly: string; yearly: string }> = {
  starter: {
    monthly: "1681638331",
    yearly: "1327560276"
  },
  professional: {
    monthly: "1727577426",
    yearly: "611573875"
  }
};

export async function POST(request: Request) {
  try {
    const { planId, email, billingCycle } = await request.json();

    if (!planId || !email) {
      return NextResponse.json(
        { error: 'Plan ID and email are required' },
        { status: 400 }
      );
    }

    let actualPlanId = planId;
    
    if (billingCycle === 'yearly') {
      const planKey = Object.keys(PLAN_IDS).find(
        key => PLAN_IDS[key].monthly === planId
      );
      
      if (planKey) {
        actualPlanId = PLAN_IDS[planKey].yearly;
      }
    }

    const response = await fetch('https://api.nowpayments.io/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY!
      },
      body: JSON.stringify({
        subscription_plan_id: actualPlanId,
        email: email
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('NOWPayments API error:', error);
      throw new Error(error.message || 'Failed to create subscription');
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true,
      invoiceUrl: data.invoice_url,
      subscriptionId: data.id,
      billingCycle: billingCycle
    });

  } catch (error: any) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
