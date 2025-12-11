'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  yearlyPrice?: string;
  period: string;
  description: string;
  features: string[];
  subscriptionPlanId: string;
  highlight?: boolean;
  isCustom?: boolean;
  icon: React.ReactNode;
}

const GlowingOrb = ({ className }: { className: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
  </div>
);

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const AnimatedCheckIcon = ({ delay }: { delay: number }) => (
  <motion.svg 
    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" 
    fill="none" 
    viewBox="0 0 24 24"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 300 }}
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="rgba(220, 38, 38, 0.1)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay, duration: 0.5 }}
    />
    <motion.path
      d="M8 12l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: delay + 0.2, duration: 0.3 }}
    />
  </motion.svg>
);

const ShimmerButton = ({ 
  children, 
  onClick, 
  disabled, 
  highlight,
  loading 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  disabled: boolean;
  highlight?: boolean;
  loading?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`relative block w-full text-center py-4 rounded-xl font-bold transition-all overflow-hidden group ${
      highlight
        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
        : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:border-white/20'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
  >
    {highlight && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
    )}
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading && (
        <motion.svg 
          className="w-5 h-5" 
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" />
        </motion.svg>
      )}
      {children}
    </span>
    <motion.div
      className={`absolute inset-0 ${highlight ? 'bg-red-500' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity`}
      style={{ filter: 'blur(20px)' }}
    />
  </motion.button>
);

const PricingCard = ({ 
  plan, 
  index, 
  onPayment, 
  loading, 
  isYearly 
}: { 
  plan: PricingPlan; 
  index: number; 
  onPayment: (plan: PricingPlan) => void;
  loading: string | null;
  isYearly: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <AnimatePresence>
        {isHovered && plan.highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-1 bg-gradient-to-r from-red-600/50 via-red-500/50 to-red-600/50 rounded-2xl blur-xl"
          />
        )}
      </AnimatePresence>
      
      <div
        className={`relative rounded-2xl p-8 border transition-all duration-500 backdrop-blur-xl ${
          plan.highlight
            ? 'border-red-500/50 bg-gradient-to-b from-red-950/40 via-black/80 to-black/80'
            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
        }`}
      >
        {/* Popular badge */}
        {plan.highlight && (
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-50" />
              <div className="relative px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-full tracking-wider">
                ✦ MOST POPULAR
              </div>
            </div>
          </motion.div>
        )}

        {/* Icon */}
        <motion.div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
            plan.highlight ? 'bg-red-500/20' : 'bg-white/5'
          }`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {plan.icon}
        </motion.div>

        <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan.name}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.description}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="wait">
              <motion.span 
                key={isYearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-5xl font-bold tracking-tight"
              >
                {plan.isCustom ? plan.price : isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
              </motion.span>
            </AnimatePresence>
            {plan.period && (
              <span className="text-gray-500 text-lg">{isYearly ? '/year' : plan.period}</span>
            )}
          </div>
          {isYearly && !plan.isCustom && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm mt-2"
            >
              Save 20% with annual billing
            </motion.p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <AnimatedCheckIcon delay={0.3 + i * 0.1} />
              <span className="text-gray-400 text-sm leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <ShimmerButton
          onClick={() => onPayment(plan)}
          disabled={loading === plan.id}
          highlight={plan.highlight}
          loading={loading === plan.id}
        >
          {loading === plan.id ? "PROCESSING..." : plan.isCustom ? "CONTACT SALES →" : "GET STARTED →"}
        </ShimmerButton>
      </div>
    </motion.div>
  );
};

const CursorGlow = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
      }}
    />
  );
};

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: "Starter",
      price: "$49",
      yearlyPrice: "$470",
      period: "/month",
      description: "Essential protocols for growing teams ready to scale operations",
      features: [
        "5 Executive Protocols",
        "10 AI Tool Modules",
        "Email Support (48h)",
        "Standard Documentation",
        "API Access (100 calls/day)"
      ],
      subscriptionPlanId: "1681638331",
      icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'professional',
      name: "Professional",
      price: "$149",
      yearlyPrice: "$1,430",
      period: "/month",
      description: "Complete toolkit for serious operations and scaling businesses",
      features: [
        "All 60+ Executive Protocols",
        "Unlimited AI Tool Access",
        "Priority Support (4h)",
        "Advanced Analytics Dashboard",
        "API Access (Unlimited)",
        "Custom Protocol Requests (2/mo)",
        "Team Collaboration (up to 10)"
      ],
      subscriptionPlanId: "1727577426",
      highlight: true,
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: 'enterprise',
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "White-label deployment with dedicated infrastructure and support",
      features: [
        "Everything in Professional",
        "White-label Deployment",
        "Dedicated Account Manager",
        "Custom Protocol Development",
        "SLA Guarantee (99.9%)",
        "On-premise Option Available",
        "Unlimited Team Members",
        "Training & Onboarding"
      ],
      subscriptionPlanId: "",
      isCustom: true,
      icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const handlePayment = async (plan: PricingPlan) => {
    if (plan.isCustom) {
      window.location.href = "mailto:sales@konkred.xyz?subject=Enterprise%20Plan%20Inquiry";
      return;
    }

    setLoading(plan.id);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId: plan.subscriptionPlanId,
          email: 'customer@example.com',
          billingCycle: isYearly ? 'yearly' : 'monthly'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      if (data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initiate payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <NoiseOverlay />
      <CursorGlow />
      <GridBackground />
      
      {/* Glowing orbs */}
      <GlowingOrb className="w-[600px] h-[600px] bg-red-600 -top-40 -left-40" />
      <GlowingOrb className="w-[400px] h-[400px] bg-purple-600 top-1/2 -right-20" />
      <GlowingOrb className="w-[500px] h-[500px] bg-red-800 bottom-0 left-1/3" />

      {/* Header */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-black/20"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a 
            href="/" 
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              KONKRED
            </span>
          </motion.a>
          <div className="flex items-center gap-8">
            {['PROTOCOLS', 'TOOLS', 'PRICING'].map((item, i) => (
              <motion.a 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className={`text-sm tracking-wide transition-colors ${
                  item === 'PRICING' ? 'text-white font-semibold' : 'text-gray-500 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a 
              href="/enter" 
              className="px-5 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-lg text-sm font-medium backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              ENTER
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-8 backdrop-blur-sm"
        >
          <motion.span 
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-gray-400">TRANSPARENT PRICING</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Choose Your{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
              Execution Level
            </span>
            <motion.span 
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Production-grade protocols and AI systems. Pay with crypto or card. Cancel anytime.
        </motion.p>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <span className={`text-sm transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-16 h-8 bg-white/10 rounded-full p-1 transition-colors border border-white/10"
          >
            <motion.div
              className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"
              animate={{ x: isYearly ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
              -20%
            </span>
          </span>
        </motion.div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 container mx-auto px-6 mb-8"
          >
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing Cards */}
      <div className="relative z-10 container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              onPayment={handlePayment}
              loading={loading}
              isYearly={isYearly}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 px-8 py-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto">
            {[
              { icon: '🔒', text: 'Bank-grade Encryption' },
              { icon: '💳', text: 'Crypto & Cards Accepted' },
              { icon: '⚡', text: 'Instant Activation' },
              { icon: '🔄', text: 'Cancel Anytime' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-400 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-600 text-sm">
              Powered by NOWPayments • All transactions encrypted
            </p>
            <div className="flex items-center justify-center gap-4">
              {['BTC', 'ETH', 'USDT', 'VISA', 'MC'].map((payment, i) => (
                <motion.span 
                  key={payment}
                  className="px-3 py-1 bg-white/5 rounded-md text-gray-500 text-xs font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  {payment}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 container mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major cryptocurrencies (BTC, ETH, USDT, and 100+ more) as well as credit cards, Apple Pay, and Google Pay.' },
              { q: 'Is there a free trial?', a: 'We offer a 14-day money-back guarantee on all plans. Try risk-free.' },
              { q: 'Do you offer refunds?', a: 'Yes, we offer full refunds within the first 14 days of your subscription.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm hover:border-white/10 transition-colors"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}