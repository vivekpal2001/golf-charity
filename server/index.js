require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeRoutes = require('./routes/stripe');
const drawRoutes = require('./routes/draws');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Stripe webhook needs raw body
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON body parser for all other routes
app.use(express.json());

// Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/draws', drawRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏌️ Golf Charity API running on port ${PORT}`);
});
