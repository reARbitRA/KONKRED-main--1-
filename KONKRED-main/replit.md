# Executive Protocols Marketplace

## Project Overview

Production-ready AI system marketplace with cinematic industrial UI, built with Next.js 14, TypeScript, and NOWPayments crypto integration.

**Type**: Next.js 14 Web Application (App Router + TypeScript)  
**Port**: Frontend runs on 5000 (development), PORT environment variable (production)  
**Database**: Supabase PostgreSQL (external service)  
**Payment**: NOWPayments crypto payments (USDT)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS animations
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: NOWPayments (crypto/USDT)
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk + JetBrains Mono

## Architecture

### Frontend
- Cinematic UI with industrial terminal aesthetics
- Framer Motion animations for smooth transitions
- Dark theme with neon red accents (#ff2c40)
- Responsive design with mobile optimization

### Backend
- Next.js API routes for payment processing
- NOWPayments integration for crypto payments
- Supabase for authentication and database
- IPN webhook handling for payment confirmations

### Key Pages
- `/` - Cinematic homepage with animated hero
- `/protocols` - Filterable protocol library
- `/protocol/[slug]` - Detailed protocol view
- `/tools` - Integrated AI tools showcase
- `/enter` - Authentication
- `/join` - Registration
- `/vault` - User dashboard (protected)

## Environment Variables

### Required Secrets (User Must Provide)
Set these in the Replit Secrets tab:
- `NOWPAYMENTS_API_KEY` - Your NOWPayments API key
- `NOWPAYMENTS_IPN_SECRET` - Webhook validation secret
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (backend only)

### Pre-configured Environment Variables
Already set in shared environment:
- `NOWPAYMENTS_API_URL=https://api.nowpayments.io`
- `NOWPAYMENTS_PAY_CURRENCY=usdt`

### Dynamic Environment Variables
- `FRONTEND_BASE_URL` - Should be set to your Replit deployment URL for webhook callbacks

## Development

### Running Locally
The workflow "Start application" runs `npm run dev` on port 5000 with webview output.

### Building
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## Deployment

Configured for autoscale deployment (stateless Next.js app):
- **Build command**: `npm run build`
- **Run command**: Automatic (Next.js handles this)
- **Deployment target**: Autoscale (ideal for stateless web apps)

After deployment, remember to:
1. Set `FRONTEND_BASE_URL` environment variable to your production URL
2. Configure NOWPayments webhook URL to point to your deployment
3. Verify all Supabase credentials are set correctly

## Database Setup

The project includes database schema files:
- `supabase-schema.sql` - Core database schema
- `seed-data.sql` - Sample data for testing

Run these SQL files in your Supabase project SQL editor to set up the database.

### Core Tables
- `protocols` - AI protocol listings
- `acquisitions` - User purchases via NOWPayments
- `tool_access` - User permissions for tools

## Payment Flow

1. User clicks "Acquire" on a protocol
2. Backend creates NOWPayments session (USDT)
3. User redirected to crypto payment page
4. NOWPayments IPN webhook confirms payment
5. Protocol appears in user's Vault

## Design Language

### Terminology
- Use "protocol" or "Executive Protocol" (never "prompt")
- Use "Enter" for login, "Join" for registration
- Use "Acquire" for purchase, "Access" for tools, "Download" for files

### Visual Style
- Cyber-industrial terminal interface
- Animated panel frames and scan line effects
- LED indicators and terminal-style components
- Neon red accents (#ff2c40)
- 3D card hovers with parallax effects

## Project Structure

```
/src
  /app - Next.js App Router pages
    /api - API routes (checkout, webhook handling)
    /enter - Authentication page
    /join - Registration page
    /protocols - Protocol listing
    /protocol/[slug] - Individual protocol
    /tools - AI tools showcase
    /vault - User dashboard
  /components - Reusable UI components
  /lib - Utilities and helpers
/public - Static assets
/supabase-schema.sql - Database schema
/seed-data.sql - Sample data
```

## Recent Changes

- 2024-12-07: Initial Replit setup
  - Configured Next.js for port 5000 with host 0.0.0.0
  - Set up environment variables structure
  - Configured autoscale deployment
  - Created development workflow

## Notes

- Next.js build configured to ignore TypeScript errors (`ignoreBuildErrors: true`)
- Telemetry enabled by default (can opt-out via Next.js telemetry command)
- Supabase Row Level Security (RLS) should be enabled for all tables
- NOWPayments webhook validation uses HMAC-SHA512
