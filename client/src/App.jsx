import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Charities from './pages/Charities';
import CharityDetail from './pages/CharityDetail';

// Protected User Pages
import Dashboard from './pages/Dashboard';
import Scores from './pages/dashboard/Scores';
import Subscription from './pages/dashboard/Subscription';
import Charity from './pages/dashboard/Charity';
import Winnings from './pages/dashboard/Winnings';
import Results from './pages/dashboard/Results';

// Admin Pages
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/charities" element={<Charities />} />
            <Route path="/charities/:id" element={<CharityDetail />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/scores" element={<ProtectedRoute><Scores /></ProtectedRoute>} />
            <Route path="/dashboard/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
            <Route path="/dashboard/charity" element={<ProtectedRoute><Charity /></ProtectedRoute>} />
            <Route path="/dashboard/winnings" element={<ProtectedRoute><Winnings /></ProtectedRoute>} />
            <Route path="/dashboard/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
