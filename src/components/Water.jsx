import React, { useState } from 'react';
import { 
  Droplet, 
  DropletOff, 
  HelpCircle,
  TrendingDown, 
  ArrowUpRight, 
  ShieldCheck,
  Zap,
  Activity,
  PenTool,
  Wrench,
  Radio,
  CloudRain,
  Waves,
  Gauge
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function Water({ 
  water, 
  kpis, 
  isRealtime = false, 
  weather, 
  cityName = 'Smart EcoCity' 
}) {
  const [dronesActive, setDronesActive] = useState(false);

  // Apply simulated modifications to water parameters
  const getModifiedLeaks = () => {
    return dronesActive ? 0 : kpis.activeLeaks;
  };

  const getModifiedReservoirs = () => {
    return water.reservoirLevels.map(res => {
      // Drones repair leaks, increasing effective reservoir volume retention
      if (dronesActive) {
        return { ...res, level: Math.min(res.level + 3, res.max) };
      }
      return res;
    });
  };

  const activeLeaks = getModifiedLeaks();
  const currentReservoirs = getModifiedReservoirs();

  return (
    <div className="space-y-6">
      
      {/* Live Hydrology & Precipitation Sensor Deck (When Live API is Active) */}
      {isRealtime && weather && (
        <div className="glass-panel border-teal-500/20 p-5 rounded-2xl shadow-xl bg-gradient-to-r from-teal-950/20 via-slate-900/60 to-slate-950/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-teal-400" />
                Live Hydrological Inflow & Watershed Radar ({cityName})
              </h3>
            </div>
            <span className="text-[11px] text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
              Open-Meteo Flood & Weather
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Real-time Precipitation */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Surface Precipitation</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.precipitation}</span>
                  <span className="text-xs text-slate-400">mm/h</span>
                </div>
                <p className="text-[10px] text-sky-400 font-semibold mt-0.5">
                  {weather.precipitation > 2 ? 'Heavy rainfall aquifer recharge' : weather.precipitation > 0 ? 'Light precipitation runoff' : 'Zero surface precipitation (dry)'}
                </p>
              </div>
            </div>

            {/* River Inflow Discharge */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">River Basin Discharge</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.riverDischarge}</span>
                  <span className="text-xs text-slate-400">m³/s</span>
                </div>
                <p className="text-[10px] text-teal-400 font-semibold mt-0.5">
                  Continuous feeder volume replenishment
                </p>
              </div>
            </div>

            {/* Aquifer & Soil Moisture */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Atmospheric Humidity</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.humidity}</span>
                  <span className="text-xs text-slate-400">% RH</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                  Evaporative cooling index: Low loss
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top row - reservoir levels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentReservoirs.map((res, index) => (
          <div key={index} className="glass-panel p-5 rounded-2xl glow-teal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
                  <Droplet className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Reservoir
                </span>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-slate-100 text-sm tracking-tight">{res.name}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-4xl font-extrabold text-white tracking-tight">{res.level}</h3>
                  <span className="text-xs font-bold text-slate-400">% Capacity</span>
                </div>
              </div>
            </div>
            
            {/* Visual level progress bar */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full mt-4 overflow-hidden relative">
              <div 
                className="h-full bg-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${res.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main analytics panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Drone Repair controls */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Smart Grid Leak Repair Deck</h3>
            <p className="text-xs text-slate-400 mb-4">Launch micro-repair drones to seal identified pipe fissures.</p>
            
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl text-center space-y-4">
              <div className="flex justify-center">
                {activeLeaks > 0 ? (
                  <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full animate-pulse">
                    <DropletOff className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  {activeLeaks > 0 ? `${activeLeaks} Active Pipe Leaks Detected` : 'All Fissures Sealed'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {activeLeaks > 0 
                    ? 'Acoustic pipe sensors indicate pressurized water escaping near Sector 2.' 
                    : 'System pressure is fully balanced at 4.2 bars with nominal resistance.'}
                </p>
              </div>

              <button
                onClick={() => setDronesActive(!dronesActive)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  dronesActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>{dronesActive ? 'Recall Autonomous Drones' : 'Deploy Repair Drones'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-start gap-2 text-[10px] text-slate-400 mt-6 leading-normal">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p>Smart acoustic hydrophones automatically map acoustic resonance of underground pipes to detect fissures.</p>
          </div>
        </div>

        {/* 7-day consumption chart */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight">Weekly Consumption & Municipal Flow</h3>
            <span className="text-xs text-slate-400 font-mono">Million Gallons / Day</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Historical flow metrics through municipal supply hubs.</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={water.consumptionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={['dataMin - 20', 'dataMax + 20']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#14b8a6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#14b8a6' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="glass-panel p-5 rounded-2xl">
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Water Grid Sector Diagnostics ({cityName})</h3>
        <p className="text-xs text-slate-400 mb-4">Sector consumption and main flow rates.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {water.sectors.map((sec, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">{sec.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sec.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                }`}>
                  {sec.status}
                </span>
              </div>
              <div className="space-y-1 mt-3 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Consumption:</span>
                  <span className="text-white font-mono font-bold">{sec.consumption}k m³/d</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Flow Rate:</span>
                  <span className="text-teal-400 font-mono font-bold">{sec.flowRate} m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
