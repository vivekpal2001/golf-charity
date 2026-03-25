# Golf Charity Subscription Platform

Play Golf. Win Prizes. Change Lives.

A premium, state-of-the-art subscription platform where golf enthusiasts can enter their Stableford scores to participate in a massive monthly prize draw. A percentage of every subscription goes directly to user-selected charities.

Built with React, Vite, TailwindCSS (v4), GSAP, Framer Motion, Supabase, and Stripe.

## 📁 Project Structure

```
Golf_Charity_Subscription_Platform/
├── client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── api/             # Supabase & Stripe API helpers
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth context provider
│   │   ├── hooks/           # Custom React hooks
│   │   └── pages/           # Route pages (public, dashboard, admin)
│   ├── public/              # Static assets
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env                 # Frontend env vars
│
├── server/                  # Express.js Backend
│   ├── routes/
│   │   ├── stripe.js        # Stripe checkout, verify, cancel, webhooks
│   │   └── draws.js         # Draw execution engine
│   ├── index.js             # Express server entry point
│   ├── package.json
│   └── .env                 # Backend env vars
│
├── package.json             # Root orchestrator (runs both)
├── README.md
└── .gitignore
```

## 🌟 Features

### For Players
- **5-Score FIFO System** — Your 5 most recent golf scores act as lottery numbers.
- **Charity Slider** — Choose how much of your subscription (10%-100%) goes to charity.
- **Monthly Prize Draws** — Match numbers to win shares of the prize pool.
- **Past Results** — Full transparency: see every published draw's numbers, prize pool, and charity raised.
- **Cancel Anytime** — One-click subscription cancellation.

### For Admins
- **Draw Manager** — Execute monthly draws with animated reveals.
- **Winner Verification** — Review proof uploads and approve payouts.
- **Charity Management** — Add/edit charities available to players.
- **User Directory** — Search users, view scores, manage roles.

## 🚀 Tech Stack
- **Frontend:** React 18, Vite, React Router, Framer Motion, GSAP
- **Styling:** TailwindCSS v4, Custom CSS Variables, Glassmorphism
- **Backend:** Node.js, Express.js
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security)
- **Payments:** Stripe Checkout

## 🛠 Setup

### 1. Environment Variables

**`client/.env`**
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3001
```

**`server/.env`**
```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=3001
```

### 2. Install & Run

```bash
# Install all dependencies
npm run install:all

# Run both client & server together
npm run dev
```

Or run them separately:
```bash
# Terminal 1 — Frontend
cd client && npm run dev

# Terminal 2 — Backend
cd server && npm run dev
```

Visit `http://localhost:5173`

## 🔐 Admin Access
Sign up normally, then in Supabase Table Editor → `users` table, change your `role` from `user` to `admin`. Refresh the page to access `/admin`.
