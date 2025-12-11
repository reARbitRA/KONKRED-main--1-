// یک پروتکل: ARB-FINANCE-024

export const arbFinance024 = {
  id: "ARB-FINANCE-024",
  slug: "arb-finance-024",
  title: "Financial Derivative Pricing & Risk Management Engine",
  subdomain: "Derivatives Trading & Risk Management",
  domain: "Finance",
  classification: "PREMIUM",
  businessImpact: "$48.3M derivatives optimization",
  docsCount: 37,
  wordCount: 40000,
  priceUsd: 2900,
  shortDescription:
    "Enterprise-grade derivatives pricing and risk protocol aligned with NIST AI RMF, ISO 23894, EU AI Act, and major derivatives regulations.",

  // این‌جا فقط های‌لِول می‌گی چی تو پکیجه
  whatsIncluded: [
    "ARB-FINANCE-024 enterprise system prompt",
    "Full INPUT and OUTPUT JSON schemas",
    "Implementation guide (step-by-step integration)",
    "Model validation and backtesting playbook",
    "Regulatory & compliance brief (Dodd-Frank, EMIR, MiFID II, ISDA)",
    "Risk & scenario analysis templates",
    "Executive summary and internal training deck",
    "ROI calculator template and deployment checklist"
  ],

  // یک تکه ورودی نمونه‌ برای نمایش تو صفحه
  sampleInput: `{
  "derivativeId": "d-001",
  "instrumentProfile": {
    "instrumentType": "option",
    "underlyingAsset": "SPX Index",
    "currency": "USD",
    "notionalAmount": 10000000,
    "tradeDate": "2025-01-15",
    "maturityDate": "2025-09-15",
    "counterparty": "Global Bank A"
  },
  "marketData": {
    "spotPrice": 4800.5,
    "forwardCurve": [0.02, 0.021, 0.0225],
    "volatilitySurface": {},
    "interestRates": {},
    "dividendYield": 0.015,
    "correlationMatrix": {}
  },
  "contractSpecifications": {
    "strikePrice": 5000,
    "optionType": "call",
    "exerciseType": "european",
    "payoffStructure": "standard call option",
    "knockInOut": {},
    "settlementType": "cash"
  }
}`,

  // این‌جا می‌تونی بعداً یک تکه خروجی واقعی بذاری
  sampleOutput: `{
  "pricingId": "p-001",
  "valuationResults": {
    "fairValue": 1250000,
    "modelPrice": 12.5,
    "marketPrice": 12.8,
    "bidAskSpread": 0.4,
    "pricingConfidence": "high",
    "modelUncertainty": 0.08
  },
  "riskMetrics": {
    "greeks": {
      "delta": 0.45,
      "gamma": 0.02,
      "theta": -1500,
      "vega": 25000,
      "rho": 12000
    }
  }
}`,

  // لینک پرداخت – فعلاً یه placeholder بذار، بعداً عوضش کن
  checkoutUrl: "https://your-checkout-or-payment-link.com/arb-finance-024"
};