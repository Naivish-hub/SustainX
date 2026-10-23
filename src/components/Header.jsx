import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, 
  Clock, 
  CloudSun,
  Flame,
  CloudRain,
  Activity,
  Menu,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Radio,
  RotateCw,
  MapPin,
  Sparkles
} from 'lucide-react';
import { simulationStates } from '../data/simulationData';

export default function Header({ 
  activeTab, 
  currentSimState, 
  setCurrentSimState, 
  activeOptimizationsCount,
  sidebarOpen,
  setSidebarOpen,
  user,
  onOpenAuth,
  onLogout,
  // Real-time API props
  dataMode = 'realtime',
  setDataMode,
  selectedCity,
  onSelectCity,
  presetCities = [],
  onDetectLocation,
  isDetectingLocation = false,
  onRefresh,
  isLoadingRealtime = false,
  latencyMs = 0
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'pollution': return 'Air Quality & Pollution Control';
      case 'electricity': return 'Power Consumption & Grid Load';
      case 'water': return 'Water Management & Reservoir Flow';
      case 'carbon': return 'Net-Zero Pathway & Carbon Footprint';
      case 'ai': return 'AI Smart City Advisor';
      default: return 'SustainX Smart City Command';
    }
  };

  const getTabDesc = () => {
    switch (activeTab) {
      case 'pollution': return 'Real-time satellite & sensor AQI tracking, particulate concentration, and warning alerts.';
      case 'electricity': return 'Live solar irradiance, wind generation, hydro flow, and power distribution.';
      case 'water': return 'Live river discharge, precipitation telemetry, reservoir levels, and leak alarms.';
      case 'carbon': return 'Live grid carbon intensity, net-zero pathway modeling, and citizen emissions calculator.';
      case 'ai': return 'Automated optimization suggestions driven by neural grid and real-time sensor monitoring.';
      default: return 'Centralized real-time telemetry metrics and resource levels across city sectors.';
    }
  };

  return (
    <header className="glass-panel border-b border-slate-800/60 p-4 md:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-0 bg-slate-950/60 z-20 backdrop-blur-md">
      {/* Title & Path */}
      <div className="flex items-start gap-3">
        {/* Hamburger Menu Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 mt-0.5"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-0.5">
            <span>Smart City</span>
            <span>•</span>
            <span className="text-slate-400 truncate">{activeTab}</span>
            {dataMode === 'realtime' && (
              <>
                <span>•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Live API
                </span>
              </>
            )}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate">{getTabTitle()}</h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">{getTabDesc()}</p>
        </div>
      </div>

      {/* Mode Switcher, Telemetry Controls & Auth */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        
        {/* Mode Selector Pill: Live APIs vs Simulation Modes */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setDataMode && setDataMode('realtime')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              dataMode === 'realtime'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Fetch real-time data from Open-Meteo & UK ESO APIs"
          >
            <Radio className={`w-3.5 h-3.5 ${dataMode === 'realtime' ? 'text-emerald-400 animate-pulse' : ''}`} />
            <span>Live APIs</span>
          </button>

          <button
            onClick={() => setDataMode && setDataMode('simulation')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              dataMode === 'simulation'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to stress-test simulation scenarios"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulation</span>
          </button>
        </div>

        {/* If Real-Time Mode: City Selector + GPS Detect + Refresh */}
        {dataMode === 'realtime' ? (
          <div className="flex items-center gap-2">
            {/* City Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={selectedCity?.id || ''}
                onChange={(e) => {
                  const city = presetCities.find(c => c.id === e.target.value);
                  if (city && onSelectCity) onSelectCity(city);
                }}
                className="bg-transparent text-white font-bold border-none outline-none focus:ring-0 cursor-pointer pr-4 py-0 max-w-[130px] sm:max-w-none truncate"
                aria-label="Select City"
              >
                {selectedCity && !presetCities.some(c => c.id === selectedCity.id) && (
                  <option value={selectedCity.id} className="bg-[#0a0f1d] text-emerald-400">
                    📍 {selectedCity.name}
                  </option>
                )}
                {presetCities.map((city) => (
                  <option key={city.id} value={city.id} className="bg-[#0a0f1d] text-slate-200">
                    {city.name}, {city.country}
                  </option>
                ))}
              </select>
            </div>

            {/* GPS Button */}
            <button
              onClick={onDetectLocation}
              disabled={isDetectingLocation}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer disabled:opacity-50"
              title="Detect my current location via GPS"
              aria-label="Use My Location"
            >
              <MapPin className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-bounce text-emerald-400' : ''}`} />
            </button>

            {/* Live Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoadingRealtime}
              className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-60 shadow-sm"
              title={`Live Satellite Stream • Latency: ${latencyMs}ms`}
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoadingRealtime ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline font-mono text-[11px] text-emerald-400/90">{latencyMs}ms</span>
            </button>
          </div>
        ) : (
          /* Simulation Scenario Selector */
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-slate-400 hidden sm:inline">Scenario:</span>
            <select 
              value={currentSimState} 
              onChange={(e) => setCurrentSimState(e.target.value)}
              className="bg-transparent text-white font-bold border-none outline-none focus:ring-0 cursor-pointer pr-5 py-0"
            >
              {Object.entries(simulationStates).map(([key, data]) => (
                <option key={key} value={key} className="bg-[#0a0f1d] text-slate-200">
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Optimizations applied count */}
        <div className="hidden md:flex items-center gap-2 bg-slate-950/60 border border-purple-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-slate-400">Optims:</span>
          <span className="text-purple-400 font-bold">{activeOptimizationsCount}</span>
        </div>

        {/* Dynamic Time */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>

        {/* User Auth Pill / Dropdown */}
        <div className="relative" ref={userMenuRef}>
          {user && !user.isGuest ? (
            <div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-800/90 border border-emerald-500/30 hover:border-emerald-500/60 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm group"
              >
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover ring-1 ring-emerald-500/40 shrink-0"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-white leading-tight truncate max-w-[110px]">{user.name}</p>
                  <p className="text-[10px] text-emerald-400 font-medium leading-tight truncate">{user.role || 'Active Citizen'}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-panel bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-xl shadow-slate-950/60 p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2.5 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      {user.authProvider ? `${user.authProvider.toUpperCase()} Auth` : 'Verified'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Switch Profile / Login</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 hover:border-emerald-400/80 text-emerald-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-950/20 cursor-pointer group"
            >
              <LogIn className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
