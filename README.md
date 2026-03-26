# 🏌️ GolfCharity — Play Golf. Win Prizes. Change Lives.

A full-stack subscription platform that turns golf scores into lottery numbers for monthly prize draws, while automatically routing a portion of every subscription to verified charitable organizations.

---

## 📋 Table of Contents

- [Product Overview](#-product-overview)
- [How It Works — Product Logic](#-how-it-works--product-logic)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Client Architecture](#-client-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)

---

## 🎯 Product Overview

GolfCharity is a **subscription-based golf lottery** platform with a charitable twist:

1. **Users subscribe** (₹500/month or ₹5,000/year) and choose a charity partner
2. **Users enter Stableford golf scores** (1–45), keeping up to 5 active scores at any time
3. **Monthly draws** generate 5 random numbers. Users whose scores match 3, 4, or all 5 numbers **win real cash prizes**
4. **At least 10%** of all subscription revenue goes directly to the subscriber's chosen charity

### Key Features

| Feature | Description |
|---------|-------------|
| **Stripe Subscriptions** | Recurring billing via Stripe Checkout (monthly/yearly) |
| **FIFO Score System** | Users hold 5 scores max; adding a 6th auto-deletes the oldest |
| **Monthly Prize Draws** | 5 random numbers (1–45) generated; match 3/4/5 to win |
| **Tiered Prize Pool** | 40% → 5-match, 35% → 4-match, 25% → 3-match |
| **Jackpot Rollover** | If no 5-match winner, that portion rolls into next month |
| **Charity Integration** | Min 10% of subscriptions auto-routed to partner NGOs |
| **Supabase Auth** | Email/password signup with role-based access (user/admin) |
| **Personal Dashboard** | Score entry, subscription management, winnings, settings |
| **Admin Dashboard** | Draw execution, result management |
| **Dark Mode UI** | Premium glassmorphism design with Manrope typography |

---

## 🧠 How It Works — Product Logic

### 1. Subscription Flow

```
User signs up → Picks plan (₹500/mo or ₹5000/yr)
→ Redirected to Stripe Checkout → Pays via card
→ Stripe confirms → Server saves subscription to Supabase
→ User's dashboard unlocks score entry
```

- **Stripe Checkout** creates a subscription with metadata: `userId`, `charityId`, `charityPercentage`
- On success, the client calls `/api/stripe/verify-session` which retrieves the session from Stripe, validates payment, and inserts a row into the `subscriptions` table
- Stripe Webhooks handle asynchronous events (renewals, cancellations) in production

### 2. Score Entry System (FIFO)

```
User enters a Stableford score (integer 1–45) with a date
→ If user has < 5 scores → score is added
→ If user has 5 scores → oldest score is auto-deleted, new one added
→ These 5 scores become the user's "lottery numbers" for the draw
```

- Scores are stored in the `scores` table with `user_id`, `score`, `date`
- The FIFO logic is in `client/src/utils/scoreLogic.js`
- Users can view their active scores on the dashboard, complete with a visual progress bar

### 3. Monthly Draw Engine

```
Admin triggers draw → 5 unique random numbers generated (1–45)
→ All active users' scores are fetched
→ Each user's scores compared against draw numbers
→ Users matching ≥3 numbers are flagged as winners
→ Prizes distributed proportionally within each tier
```

**Prize Pool Calculation:**
```
Total Revenue = Active Subscribers × ₹500
Charity Fund  = Total Revenue × 10%  (sent to charities)
Prize Pool    = Total Revenue × 90%  (available for prizes)

5-Match Tier  = Prize Pool × 40%  (+rollover from previous months)
4-Match Tier  = Prize Pool × 35%
3-Match Tier  = Prize Pool × 25%
```

**Rollover Logic:** If no one matches all 5 numbers, the 40% portion accumulates ("rolls over") into the next month's 5-match tier, creating a growing jackpot.

**Prize Splitting:** If multiple users win the same tier, the prize is split equally. Example: 3 users match 4 numbers → each gets `(Pool × 35%) / 3`.

### 4. Revenue Split

```
┌──────────────────────────────┐
│  Subscriber pays ₹500/month  │
├──────────────────────────────┤
│  70% → Prize Pool            │
│  10% → Charity Fund          │
│  15% → Platform Operations   │
│   5% → Reserve Fund          │
└──────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Vanilla CSS (dark glassmorphism design system) |
| **Animation** | CSS keyframes + IntersectionObserver |
| **Auth** | Supabase Auth (email/password) |
| **Database** | Supabase (PostgreSQL) |
| **Payments** | Stripe Checkout + Webhooks |
| **Backend API** | Express.js (Node.js) |
| **Font** | Manrope (Google Fonts) |
| **Icons** | Material Symbols + Lucide React |

---

## 📁 Project Structure

```
Golf_Charity_Subscription_Platform/
├── client/                         # React frontend (Vite)
│   ├── index.html                  # Entry HTML with meta tags + fonts
│   ├── src/
│   │   ├── api/
│   │   │   ├── supabase.js         # Supabase client + auth helpers
│   │   │   └── stripe.js           # Stripe checkout session creation
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx      # Glassmorphism nav with auth state
│   │   │   │   └── Footer.jsx      # 4-column dark footer
│   │   │   ├── dashboard/
│   │   │   │   ├── ScoreEntry.jsx   # Score input form (slider + number)
│   │   │   │   ├── ScoreList.jsx    # Active scores display with bars
│   │   │   │   └── SubscriptionCard.jsx  # Current plan / subscribe UI
│   │   │   └── ui/
│   │   │       ├── AnimatedSection.jsx   # Scroll-reveal wrapper
│   │   │       └── GlassCard.jsx         # Tilt-effect glass card
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state (user + profile)
│   │   ├── hooks/
│   │   │   ├── useAuth.js          # Auth context consumer
│   │   │   ├── useScores.js        # Fetch & manage user scores
│   │   │   └── useSubscription.js  # Fetch subscription status
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page (hero, stats, pricing)
│   │   │   ├── HowItWorks.jsx      # 3-step guide + FAQ
│   │   │   ├── Prizes.jsx          # Prize tiers + fair play breakdown
│   │   │   ├── Charities.jsx       # Partner NGOs showcase
│   │   │   ├── Winners.jsx         # Hall of fame + draw results
│   │   │   ├── About.jsx           # Mission, pillars, timeline
│   │   │   ├── Login.jsx           # Sign in form
│   │   │   ├── Signup.jsx          # Registration form
│   │   │   ├── Dashboard.jsx       # Overview with sidebar nav
│   │   │   ├── Admin.jsx           # Admin draw execution panel
│   │   │   └── dashboard/
│   │   │       ├── Scores.jsx      # Score management page
│   │   │       ├── Subscription.jsx # Plan management + Stripe verify
│   │   │       ├── Charity.jsx     # Charity selection
│   │   │       ├── Winnings.jsx    # Prize history
│   │   │       ├── Results.jsx     # Past draw results
│   │   │       └── Settings.jsx    # Personal info (name, phone)
│   │   ├── utils/
│   │   │   ├── scoreLogic.js       # FIFO score add/get/getAllActive
│   │   │   ├── drawLogic.js        # Generate numbers + find winners
│   │   │   └── prizeCalc.js        # Pool calc, split, distribution
│   │   ├── App.jsx                 # Root router with protected routes
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Full design system (500+ lines)
│   └── package.json
│
├── server/                         # Express API
│   ├── index.js                    # Server entry (CORS, routes, health)
│   ├── routes/
│   │   ├── stripe.js               # Checkout, verify, cancel, webhook
│   │   └── draws.js                # Execute draw, get history
│   ├── .env                        # Server env vars
│   └── package.json
│
├── stitch/                         # Design mockup reference files
├── package.json                    # Root scripts (dev, build, install)
└── README.md                       # ← You are here
```

---

## 🗄 Database Schema (Supabase)

### `users`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Matches Supabase Auth user ID |
| `email` | TEXT | User's email |
| `role` | TEXT | `user` or `admin` |
| `created_at` | TIMESTAMPTZ | Auto-generated |

### `subscriptions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → users) | Subscriber reference |
| `plan` | TEXT | `monthly` or `yearly` |
| `amount` | INTEGER | 500 or 5000 |
| `status` | TEXT | `active`, `cancelled`, or `expired` |
| `stripe_subscription_id` | TEXT | Stripe subscription reference |
| `charity_id` | UUID (FK → charities) | Selected charity |
| `charity_percentage` | INTEGER | Min 10% |
| `current_period_start` | TIMESTAMPTZ | Billing period start |
| `current_period_end` | TIMESTAMPTZ | Billing period end |

### `scores`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → users) | Score owner |
| `score` | INTEGER | Stableford score (1–45) |
| `date` | DATE | Date of the round |
| `created_at` | TIMESTAMPTZ | For FIFO ordering |

### `draws`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `month` | TEXT | "March 2026" |
| `numbers` | JSONB | Array of 5 drawn numbers |
| `prize_pool_total` | DECIMAL | Total pool (subscribers × 500 × 90%) |
| `prize_5_match` | DECIMAL | 40% of pool + rollover |
| `prize_4_match` | DECIMAL | 35% of pool |
| `prize_3_match` | DECIMAL | 25% of pool |
| `jackpot_rollover` | DECIMAL | Unclaimed 5-match funds |
| `status` | TEXT | `pending` or `completed` |
| `created_at` | TIMESTAMPTZ | Draw execution timestamp |

### `winners`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `draw_id` | UUID (FK → draws) | Which draw |
| `user_id` | UUID (FK → users) | Winner reference |
| `match_type` | TEXT | `3`, `4`, or `5` |
| `prize_amount` | DECIMAL | Individual payout |

---

## 🔌 API Reference

**Base URL:** `http://localhost:3001/api`

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Returns `{ status: "ok", timestamp }` |

### Stripe Routes (`/api/stripe`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/create-checkout-session` | `{ priceId, userId, charityId, charityPercentage }` | Creates a Stripe Checkout session, returns `{ url }` to redirect user |
| `POST` | `/verify-session` | `{ sessionId }` | Verifies a completed checkout, saves subscription to Supabase. Idempotent |
| `POST` | `/cancel-subscription` | `{ subscriptionId }` | Cancels subscription at period end in Stripe, updates Supabase status |
| `POST` | `/webhook` | Raw body (Stripe signature) | Handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` |

### Draw Routes (`/api/draws`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/execute` | — | Generates 5 random numbers, compares all user scores, assigns prizes, handles rollover. Returns `{ draw, numbers, winners, prizePool, rollover }` |
| `GET` | `/history` | — | Returns last 20 draws ordered by date descending |

---

## 🖥 Client Architecture

### Auth Flow
```
App.jsx → AuthProvider wraps all routes
  → Supabase onAuthStateChange listener
  → Sets user + profile in context
  → ProtectedRoute checks user exists
  → AdminRoute checks profile.role === 'admin'
```

### Public Pages (6 pages — dark theme)
- `/` — Hero, stats bar, how it works, pricing, testimonials, CTA
- `/how-it-works` — 3-step editorial guide with FAQ accordion
- `/prizes` — Prize tiers, fair play breakdown, CTA
- `/charities` — Partner NGO grid, impact stats, marquee
- `/winners` — Hall of fame, winning numbers display, past champions
- `/about` — Mission pillars, founder story, timeline

### Dashboard Pages (7 routes — protected)
- `/dashboard` — Overview with sidebar nav, quick stats, score entry
- `/dashboard/scores` — Score management with slider input
- `/dashboard/subscription` — Plan management, Stripe verify flow
- `/dashboard/charity` — Charity selection
- `/dashboard/winnings` — Prize history
- `/dashboard/results` — Past draw results
- `/dashboard/settings` — Personal info (name, phone, email read-only)

### Custom Hooks
| Hook | Purpose |
|------|---------|
| `useAuth()` | Access `user`, `profile`, `isAdmin`, `loading` from AuthContext |
| `useScores()` | Fetches user's scores, provides `scores`, `loading`, `refresh` |
| `useSubscription()` | Fetches subscription, provides `subscription`, `loading`, `isActive` |

### Utility Modules
| Module | Key Exports |
|--------|-------------|
| `scoreLogic.js` | `addScore(userId, score, date)` — FIFO add with auto-delete oldest if 5 exist |
| `drawLogic.js` | `generateDrawNumbers()` — 5 unique random (1–45); `findWinners(numbers, scores)` |
| `prizeCalc.js` | `calculatePrizePool()`, `splitPrize()`, `calculateDistribution()`, `formatCurrency()` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- **Supabase** project (free tier works)
- **Stripe** account (test mode)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/Golf_Charity_Subscription_Platform.git
cd Golf_Charity_Subscription_Platform

# Install all dependencies (root + client + server)
npm run install:all
```

### Running Locally

```bash
# Start both client (port 5173) and server (port 3001) concurrently
npm run dev
```

Or run them separately:
```bash
# Terminal 1 — Frontend
cd client && npm run dev

# Terminal 2 — Backend
cd server && npm run dev
```

---

## 🔑 Environment Variables

### Client (`client/.env`)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3001
```

### Server (`server/.env`)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=3001
```

---

## 🌐 Deployment

| Component | Recommended Platform |
|-----------|---------------------|
| Frontend | Vercel, Netlify |
| Backend | Railway, Render, Fly.io |
| Database | Supabase (managed PostgreSQL) |
| Payments | Stripe (configure webhook URL in dashboard) |

### Production Checklist
- [ ] Switch Stripe keys from `test` to `live`
- [ ] Configure Stripe Webhook endpoint URL
- [ ] Set `VITE_API_URL` to production backend URL
- [ ] Enable Supabase Row Level Security (RLS) policies
- [ ] Set up cron job for monthly draw execution (or trigger manually via admin)

---

## 📄 License

MIT

---

**Built with ❤️ for golf & giving**
