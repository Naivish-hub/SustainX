import React, { useState } from 'react';
import { 
  Globe2, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Eye, 
  EyeOff,
  Leaf,
  Zap,
  ArrowUpRight,
  Compass
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  onSkip, 
  allowClose = true 
}) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(''); // 'email' | 'google' | 'guest'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.email || !formData.password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (!formData.name) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);
    setLoadingType('email');

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: mode === 'signup' ? formData.name : (formData.email.split('@')[0] || 'Eco Officer'),
        email: formData.email,
        role: mode === 'signup' ? 'Eco Explorer' : 'Smart Grid Officer',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formData.email)}`,
        isGuest: false,
        authProvider: 'email',
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      setSuccessMessage(mode === 'signup' ? 'Account created successfully! Initializing telemetry...' : 'Welcome back! Loading command center...');
      
      setTimeout(() => {
        onLoginSuccess(user);
      }, 700);
    }, 900);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setLoadingType('google');
    setErrorMessage('');

    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      const googleUser = {
        name: 'Jordan Chen',
        email: 'jordan.chen@ecopolis.io',
        role: 'Chief Sustainability Officer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isGuest: false,
        authProvider: 'google',
        joinedAt: 'Mar 2026'
      };
      setSuccessMessage('Authenticated with Google! Welcome Jordan.');
      
      setTimeout(() => {
        onLoginSuccess(googleUser);
      }, 700);
    }, 1100);
  };

  const handleQuickDemo = (demoType) => {
    setIsLoading(true);
    setLoadingType('demo');
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = demoType === 'admin' ? {
        name: 'Dr. Elena Vance',
        email: 'elena.vance@sustainx.gov',
        role: 'Regional Grid Director',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        isGuest: false,
        authProvider: 'demo',
        joinedAt: 'Jan 2026'
      } : {
        name: 'Marcus Thorne',
        email: 'marcus.t@ecocity.net',
        role: 'Environmental Analyst',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        isGuest: false,
        authProvider: 'demo',
        joinedAt: 'Feb 2026'
      };
      setSuccessMessage(`Signed in as ${demoUser.name}`);
      setTimeout(() => {
        onLoginSuccess(demoUser);
      }, 600);
    }, 700);
  };

  const handleSkipNow = () => {
    setIsLoading(true);
    setLoadingType('guest');
    setTimeout(() => {
      setIsLoading(false);
      onSkip();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-xl glass-panel bg-slate-900/90 border border-slate-700/60 rounded-3xl shadow-2xl shadow-emerald-950/40 overflow-hidden my-auto">
        
        {/* Header Ribbon / Glow Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Modal Close Button (optional if user can dismiss) */}
        {allowClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {/* Logo & Headline */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart EcoCity AI Platform</span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-gradient-to-tr from-emerald-600 to-teal-400 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/25">
                <Globe2 className="w-7 h-7 text-slate-950" />
              </div>
              <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                Sustain<span className="text-emerald-400 font-black">X</span>
              </h1>
            </div>

            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Access real-time municipal telemetry, AI grid intelligence, and net-zero optimization pathways.
            </p>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/70 border border-slate-800/80 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMessage(''); }}
              className={`py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === 'signin'
                  ? 'bg-slate-800/90 text-emerald-400 shadow-md border border-slate-700/60 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); }}
              className={`py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === 'signup'
                  ? 'bg-slate-800/90 text-emerald-400 shadow-md border border-slate-700/60 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-slate-900/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group mb-4"
          >
            {loadingType === 'google' && isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.8 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.4-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
                />
              </svg>
            )}
            <span>
              {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase shrink-0">
              Or with email credentials
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Maya Lin"
                    className="w-full bg-slate-950/70 border border-slate-800 focus:border-emerald-500/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-1 focus:ring-emerald-500/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@organization.gov"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-emerald-500/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo simulator email.')}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-emerald-500/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-1 focus:ring-emerald-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/70 border border-slate-800 focus:border-emerald-500/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-1 focus:ring-emerald-500/50"
                  />
                </div>
              </div>
            )}

            {/* Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40 w-4 h-4"
                />
                <span className="text-xs text-slate-400">Remember this terminal</span>
              </label>
              
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-bit Encrypted
              </span>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 group"
            >
              {loadingType === 'email' && isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                One-Click Demo Profiles:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                disabled={isLoading}
                className="text-left p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-xs transition-all cursor-pointer group"
              >
                <p className="font-semibold text-slate-200 group-hover:text-emerald-400 truncate">Dr. Elena Vance</p>
                <p className="text-[10px] text-slate-500 truncate">Grid Director</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('analyst')}
                disabled={isLoading}
                className="text-left p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-xs transition-all cursor-pointer group"
              >
                <p className="font-semibold text-slate-200 group-hover:text-emerald-400 truncate">Marcus Thorne</p>
                <p className="text-[10px] text-slate-500 truncate">Eco Analyst</p>
              </button>
            </div>
          </div>

          {/* Skip for Now Button */}
          <div className="mt-4 pt-3 text-center border-t border-slate-800/60">
            <button
              type="button"
              onClick={handleSkipNow}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 text-xs font-semibold transition-all cursor-pointer group"
            >
              <Compass className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              <span>Skip for now & continue as Guest</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 mt-1">
              You can sign in or switch profiles anytime from the command header.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
