import React from 'react';
import { 
  LayoutDashboard, 
  Wind, 
  Zap, 
  Droplet, 
  Leaf, 
  BrainCircuit,
  Activity,
  Globe2,
  X,
  LogIn,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  systemStatus, 
  sidebarOpen, 
  setSidebarOpen,
  user,
  onOpenAuth,
  onLogout,
  isRealtime = false
}) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, color: 'text-emerald-400' },
    { id: 'pollution', label: 'Air Quality', icon: Wind, color: 'text-rose-400' },
    { id: 'electricity', label: 'Energy Grid', icon: Zap, color: 'text-amber-400' },
    { id: 'water', label: 'Water Level', icon: Droplet, color: 'text-sky-400' },
    { id: 'carbon', label: 'Net-Zero Carbon', icon: Leaf, color: 'text-emerald-400' },
    { id: 'ai', label: 'AI Advisor', icon: BrainCircuit, color: 'text-purple-400' },
  ];

  return (
    <aside className={`w-64 glass-panel border-r border-slate-800 flex flex-col justify-between h-screen fixed lg:sticky top-0 shrink-0 z-50 lg:z-30 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div>
        {/* Brand/Logo */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-400 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Globe2 className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Sustain<span className="text-emerald-400 font-black">X</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Smart EcoCity</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800/60 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium ${
                  isActive 
                    ? 'bg-slate-800/80 text-white shadow-sm border border-slate-700/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? item.color : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: User Card & System Status */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/50 space-y-3">
        {/* User Card */}
        {user && !user.isGuest ? (
          <div className="glass-panel p-2.5 rounded-xl border-slate-800/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate leading-tight">{user.role || 'Eco Operator'}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Log Out"
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-400 text-xs font-semibold transition-all cursor-pointer group shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Sign In / Create Account</span>
          </button>
        )}

        {/* System Telemetry Status */}
        <div className="flex items-center gap-2.5 glass-panel p-2.5 rounded-xl border-slate-800/40 text-xs">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-300 font-semibold text-[11px] truncate">
              {isRealtime ? 'Live Satellite APIs' : 'Simulation Preset'}
            </p>
            <p className="text-slate-500 font-medium text-[9px] truncate">
              {isRealtime ? 'Open-Meteo & UK ESO' : 'Stress Scenario Active'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
