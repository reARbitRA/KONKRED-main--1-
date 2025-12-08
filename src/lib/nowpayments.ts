import CryptoJS from 'crypto-js';

export interface NOWPaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  success_url: string;
  cancel_url: string;
}

export interface NOWPaymentResponse {
  id: string;
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: string;
  price_currency: string;
  pay_amount: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
  purchase_url: string;
}

export interface NOWIPN {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: string;
  price_currency: string;
  pay_amount: string;
  actually_paid: string;
  actually_paid_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  purchase_id: string;
  created_at: string;
  updated_at: string;
}

class NOWPaymentsClient {
  private apiKey: string;
  private ipnSecret: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NOWPAYMENTS_API_KEY!;
    this.ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;
    this.baseUrl = process.env.NOWPAYMENTS_API_URL || 'https://api.nowpayments.io';
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`NOWPayments API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async createPayment(paymentRequest: NOWPaymentRequest): Promise<NOWPaymentResponse> {
    return this.makeRequest<NOWPaymentResponse>('/v1/payment', {
      method: 'POST',
      body: JSON.stringify(paymentRequest),
    });
  }

  async getPaymentStatus(paymentId: string): Promise<NOWPaymentResponse> {
    return this.makeRequest<NOWPaymentResponse>(`/v1/payment/${paymentId}`);
  }

  validateIPNSignature(payload: string, signature: string, hmac: string): boolean {
    const computedHmac = CryptoJS.HmacSHA512(payload, this.ipnSecret).toString();
    return computedHmac === hmac;
  }

  parseIPN(payload: string): NOWIPN {
    try {
      return JSON.parse(payload);
    } catch (error) {
      throw new Error('Invalid IPN payload format');
    }
  }
}

export const nowpayments = new NOWPaymentsClient();
export default nowpayments;