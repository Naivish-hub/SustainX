import React, { useState } from 'react';
import { 
  Zap, 
  BatteryCharging, 
  HelpCircle,
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Sun,
  Wind as WindIcon,
  Waves,
  Cpu,
  Radio
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export default function Electricity({ 
  electricity, 
  kpis, 
  isRealtime = false, 
  weather, 
  cityName = 'Smart EcoCity' 
}) {
  const [peakShaving, setPeakShaving] = useState(false);
  const [batteryDischarge, setBatteryDischarge] = useState(false);

  // Apply simulated modifications to power parameters
  const getModifiedKpis = () => {
    let demand = kpis.powerDemand;
    let gen = kpis.powerGeneration;
    let renewablePct = kpis.renewablePercentage;

    if (peakShaving) {
      demand = Math.round(demand - 35);
      renewablePct = Math.min(renewablePct + 4, 100);
    }
    if (batteryDischarge) {
      gen = Math.round(gen + 20);
      renewablePct = Math.min(renewablePct + 3, 100);
    }

    return { demand, gen, renewablePct };
  };

  const modifiedKpis = getModifiedKpis();

  // Energy source mapping
  const currentSources = electricity.sources.map(src => {
    if (peakShaving && src.name === 'Natural Gas') {
      return { ...src, value: Math.max(src.value - 25, 10) };
    }
    if (batteryDischarge && src.name === 'Solar Power') {
      return { ...src, value: src.value + 15 };
    }
    return src;
  });

  const getSourceIcon = (name) => {
    switch (name) {
      case 'Solar Power': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Wind Farms': return <WindIcon className="w-4 h-4 text-emerald-400" />;
      case 'Hydroelectric': return <Waves className="w-4 h-4 text-teal-400" />;
      default: return <Cpu className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Live Physical Energy Parameters (When Live API is Active) */}
      {isRealtime && weather && (
        <div className="glass-panel border-amber-500/20 p-5 rounded-2xl shadow-xl bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-slate-950/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400" />
                Live Meteorological Renewable Generation Physics ({cityName})
              </h3>
            </div>
            <span className="text-[11px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Open-Meteo Solar & Wind
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Solar Irradiance */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <Sun className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Direct Solar Irradiance</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.solarRadiation}</span>
                  <span className="text-xs text-slate-400">W/m²</span>
                </div>
                <p className="text-[10px] text-amber-400 font-semibold mt-0.5">
                  Yielding {electricity.sources.find(s => s.name === 'Solar Power')?.value || 0} MW photovoltaic output
                </p>
              </div>
            </div>

            {/* Wind Velocity */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <WindIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">10m Surface Wind Speed</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.windSpeed}</span>
                  <span className="text-xs text-slate-400">km/h</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                  Yielding {electricity.sources.find(s => s.name === 'Wind Farms')?.value || 0} MW wind farm turbine output
                </p>
              </div>
            </div>

            {/* Hydroelectric Inflow */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Hydrology River Discharge</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{weather.riverDischarge}</span>
                  <span className="text-xs text-slate-400">m³/s</span>
                </div>
                <p className="text-[10px] text-teal-400 font-semibold mt-0.5">
                  Yielding {electricity.sources.find(s => s.name === 'Hydroelectric')?.value || 0} MW hydroelectric head
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Real-time Demand */}
        <div className="glass-panel p-5 rounded-2xl glow-amber">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Live Load
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Active Grid Demand</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-4xl font-extrabold text-white tracking-tight">{modifiedKpis.demand}</h3>
              <span className="text-xs font-bold text-slate-300">MW</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">Grid frequency: 50.02 Hz (Synchronized)</p>
          </div>
        </div>

        {/* Real-time Supply */}
        <div className="glass-panel p-5 rounded-2xl glow-emerald">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <BatteryCharging className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Supply
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Active Grid Generation</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-4xl font-extrabold text-white tracking-tight">{modifiedKpis.gen}</h3>
              <span className="text-xs font-bold text-slate-300">MW</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">Net Grid Reserve: +{(modifiedKpis.gen - modifiedKpis.demand)} MW</p>
          </div>
        </div>

        {/* Clean Energy Ratio */}
        <div className="glass-panel p-5 rounded-2xl glow-teal">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
              <Sun className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Green Ratio
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Renewables Share</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-4xl font-extrabold text-white tracking-tight">{modifiedKpis.renewablePct}</h3>
              <span className="text-xs font-bold text-slate-300">%</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">Fossil peaker contribution: {(100 - modifiedKpis.renewablePct)}%</p>
          </div>
        </div>
      </div>

      {/* 24-Hour Load & Generation Dynamic Trend */}
      {electricity.loadTrend && (
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight">24-Hour Grid Demand vs Generation Curve</h3>
            {isRealtime && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Weather Diurnal Cycle
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-4">Comparing city consumption demand against live generation output (MW).</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={electricity.loadTrend}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="demand" name="Demand (MW)" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
                <Area type="monotone" dataKey="generation" name="Generation (MW)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorGen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Control Panel and Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Energy Grid Controls */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Grid Load Control Deck</h3>
            <p className="text-xs text-slate-400 mb-4">Command options to regulate utility reserve loads manually.</p>
            
            <div className="space-y-4">
              {/* Load Shaving */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Industrial Peak Shaving</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Defer heavy production units during high demand.</p>
                </div>
                <button 
                  onClick={() => setPeakShaving(!peakShaving)}
                  className="text-slate-300 hover:text-white cursor-pointer"
                >
                  {peakShaving ? (
                    <ToggleRight className="w-10 h-10 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Smart Battery Bank */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Municipal Battery Discharge</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Discharge stored reserve solar cells into the active grid.</p>
                </div>
                <button 
                  onClick={() => setBatteryDischarge(!batteryDischarge)}
                  className="text-slate-300 hover:text-white cursor-pointer"
                >
                  {batteryDischarge ? (
                    <ToggleRight className="w-10 h-10 text-teal-400" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-start gap-2 text-[10px] text-slate-400 mt-6 leading-normal">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>Smart load management automations safeguard transformers from voltage collapse during surges.</p>
          </div>
        </div>

        {/* Source Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Grid Power Source Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Breakdown of generating assets feeding the active grid (MW).</p>
          
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {currentSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-slate-300">
            {currentSources.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-900/50">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="font-medium truncate">{entry.name}</span>
                <span className="font-mono text-slate-500 ml-auto font-bold">{entry.value}MW</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Consumption Bar Chart */}
        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Consumption by District Zone</h3>
          <p className="text-xs text-slate-400 mb-4">Live load tracking by commercial and residential sectors (MW).</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={electricity.zoneConsumption} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                <XAxis type="number" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} tickLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 8, 8, 0]}>
                  {electricity.zoneConsumption.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Industrial' ? '#6b7280' : entry.name === 'Residential' ? '#a855f7' : '#14b8a6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
