# Executive Protocols Marketplace

Production-ready AI system marketplace with cinematic industrial UI, built with Next.js 14, TypeScript, and NOWPayments crypto integration.

## 🎬 Cinematic Control Panel Experience

This marketplace features a **cyber-industrial terminal interface** with:
- Animated panel frames and scan line effects
- Micro-interactions and parallax card hovers
- LED indicators and terminal-style components
- Dark theme with neon red accents (#ff2c40)
- Framer Motion powered animations

## ⚡ Quick Start (Replit)

1. **Fork this Replit**
2. **Set up Environment Variables** in Replit Secrets:
   ```
   NOWPAYMENTS_API_KEY=your_nowpayments_api_key
   NOWPAYMENTS_IPN_SECRET=your_nowpayments_ipn_secret
   NOWPAYMENTS_API_URL=https://api.nowpayments.io
   NOWPAYMENTS_PAY_CURRENCY=usdt
   FRONTEND_BASE_URL=https://your-repl-url.replit.app
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
3. **Run the Replit** - it will automatically start on port 3000
4. **Deploy** - Click Deploy button in Replit for production

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS animations
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: NOWPayments (USDT crypto)
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk + JetBrains Mono

## 💰 Payment Flow (Crypto)

1. User clicks **Acquire** on protocol
2. Creates NOWPayments session (USDT)
3. Redirects to crypto payment page
4. IPN webhook confirms payment
5. Protocol appears in user **Vault**

## 🎯 Core Pages

- `/` - Cinematic homepage with animated hero
- `/protocols` - Filterable protocol library
- `/protocol/[slug]` - Detailed protocol view
- `/tools` - Integrated AI tools showcase
- `/enter` - Authentication (Enter)
- `/join` - Registration (Join)
- `/vault` - User dashboard (protected)

## 🎨 UI Components

### Motion Components
- `AnimatedPanel` - Panel with fade/scale animation
- `CinematicCard` - Card with 3D hover effect
- `TerminalButton` - Button with neon glow
- `LEDIndicator` - Blinking status lights
- `ScanLine` - Animated scanning effect

### Layout Components
- `CinematicFrame` - Main app wrapper with frame
- `Nav` - Animated navigation with hover states
- `AuthForm` - Gate-style authentication form

## 📊 Database Schema

```sql
-- Core protocols table
CREATE TABLE protocols (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text,
  description text,
  price_cents integer NOT NULL,
  industry text,
  complexity text, -- 'standard', 'advanced', 'enterprise'
  sample_output text,
  whats_included text[],
  file_url text,
  is_featured boolean DEFAULT false
);

-- User acquisitions (NOWPayments)
CREATE TABLE acquisitions (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users(id),
  protocol_id uuid references protocols(id),
  nowpayments_payment_id text,
  payment_status text, -- 'waiting', 'confirming', 'finished', 'failed'
  acquired_at timestamp with time zone DEFAULT now()
);

-- Tool access permissions
CREATE TABLE tool_access (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users(id),
  tool_name text NOT NULL,
  access_level text, -- 'free', 'pro', 'unlimited'
  expires_at timestamp with time zone
);
```

## 🚀 Deployment

### Replit Automatic Setup
- `.replit` - Development server configuration
- `replit.nix` - Node.js 20 environment
- Automatic build and deploy scripts

### Environment Variables Required
- `NOWPAYMENTS_API_KEY` - NOWPayments API key
- `NOWPAYMENTS_IPN_SECRET` - Webhook validation secret
- `NOWPAYMENTS_PAY_CURRENCY` - Crypto currency (usdt)
- `FRONTEND_BASE_URL` - Replit URL for webhooks
- Supabase credentials (URL, keys)

## 🎭 Language Rules

**Never use:**
- "prompt", "login", "sign up", "welcome", "get started"

**Always use:**
- "protocol" or "Executive Protocol"
- "Enter" (auth), "Join" (register)
- "Acquire" (purchase), "Access" (tools), "Download" (files)

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check
```

## 🎬 Cinematic Features

- **Animated frame borders** that draw on load
- **Scan line effects** moving across content
- **LED status indicators** with blinking animations
- **3D card hovers** with parallax rotation
- **Neon button effects** with sliding highlights
- **Terminal-style code blocks** with typing animation
- **Staggered grid animations** for content reveals
- **Ambient background gradients** with subtle movement

## 📱 Responsive Design

- Mobile-optimized layout with touch interactions
- Adaptive animations for performance
- Reduced motion support for accessibility
- Flexible grid system for all screen sizes

## 🔒 Security

- Supabase Row Level Security (RLS)
- Protected routes with middleware
- NOWPayments IPN validation
- Environment-based configuration
- No client-side secrets

## 🌟 Live Features

- Real-time payment status updates
- Dynamic protocol filtering
- Interactive tool modules
- User vault with download management
- Cinematic loading states

---

**Built for the future of AI system distribution.** 🚀