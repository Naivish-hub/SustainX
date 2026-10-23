import React, { useState } from 'react';
import { 
  Leaf, 
  HelpCircle, 
  TrendingDown, 
  ArrowUpRight, 
  ShieldCheck,
  Award,
  Plus,
  Compass,
  Bus,
  Car,
  UtensilsCrossed,
  Home,
  Radio,
  Zap,
  Gauge
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function Carbon({ 
  carbon, 
  kpis, 
  isRealtime = false, 
  weather, 
  rawPollutants, 
  cityName = 'Smart EcoCity' 
}) {
  // Citizen Calculator States
  const [transit, setTransit] = useState('car'); // car, public, bike
  const [diet, setDiet] = useState('balanced'); // meat, balanced, vegan
  const [energy, setEnergy] = useState('grid'); // grid, solar

  const calculateCitizenCarbon = () => {
    let score = 0;
    
    // Transit points
    if (transit === 'car') score += 8.2;
    else if (transit === 'public') score += 2.4;
    else score += 0.1;

    // Diet points
    if (diet === 'meat') score += 5.8;
    else if (diet === 'balanced') score += 3.5;
    else score += 1.2;

    // Energy points
    if (energy === 'grid') score += 4.5;
    else score += 0.8;

    return parseFloat(score.toFixed(1));
  };

  const citizenScore = calculateCitizenCarbon();
  const avgCitizen = 14.5;
  const pctDifference = Math.round(((avgCitizen - citizenScore) / avgCitizen) * 100);

  return (
    <div className="space-y-6">
      
      {/* Live Carbon Telemetry Header (When Live API is Active) */}
      {isRealtime && (
        <div className="glass-panel border-emerald-500/20 p-5 rounded-2xl shadow-xl bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-950/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Live Carbon Intensity & Net-Zero Offsets ({cityName})
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              UK ESO & Open-Meteo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Live Grid Carbon Intensity */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Grid Carbon Intensity</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">{rawPollutants?.gridIntensity ?? 110}</span>
                  <span className="text-xs text-slate-400">gCO₂/kWh</span>
                </div>
                <p className="text-[10px] text-purple-400 font-semibold mt-0.5">
                  {(rawPollutants?.gridIntensity ?? 110) < 120 ? 'Low carbon intensity grid' : 'Moderate grid fossil share'}
                </p>
              </div>
            </div>

            {/* Daily Clean Power Avoided */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Daily Clean Megawatt Offset</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">+{kpis.carbonSaved}</span>
                  <span className="text-xs text-slate-400">tons CO₂</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                  Displacing fossil peaker generation today
                </p>
              </div>
            </div>

            {/* Urban Microclimate Delta */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Urban Island Heat Delta</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold text-white">-1.4</span>
                  <span className="text-xs text-slate-400">°C cooling</span>
                </div>
                <p className="text-[10px] text-teal-400 font-semibold mt-0.5">
                  Ambient temp: {weather?.temp ?? 21.5}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Net-Zero progress */}
        <div className="glass-panel p-5 rounded-2xl glow-emerald flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Leaf className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                City Goal
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Carbon Savings (Daily)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">{kpis.carbonSaved}</h3>
                <span className="text-xs font-bold text-slate-300">tons CO₂</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Offset target: 200 tons/day by 2028</p>
            </div>
          </div>
        </div>

        {/* Global temperature delta */}
        <div className="glass-panel p-5 rounded-2xl glow-teal flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
                <Compass className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Climate Tracker
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">City Heat Island Effect</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">-1.4</h3>
                <span className="text-xs font-bold text-slate-300">°C cooling delta</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Due to green roof & forest corridors</p>
            </div>
          </div>
        </div>

        {/* Forest offset program */}
        <div className="glass-panel p-5 rounded-2xl glow-purple flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Award className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Forestry
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Trees Planted (YTD)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">42.5K</h3>
                <span className="text-xs font-bold text-slate-300">saplings</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Urban canopy density: +2.1% YoY</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator & Pathway layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Side: Pathway progression line chart */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-3 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">Carbon Emissions Net-Zero Pathway</h3>
            <p className="text-xs text-slate-400 mb-4">Tracking actual emissions output (kilotons CO₂/year) against municipal net-zero milestones.</p>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbon.pathwayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="Target Cap" 
                    stroke="#64748b" 
                    strokeDasharray="5 5" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Emissions" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#10b981' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-0.5 bg-slate-500 inline-block" />
              <span>Target Net-Zero Trajectory</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-1 bg-emerald-400 inline-block rounded-full" />
              <span className="text-emerald-400 font-semibold">Actual Monitored Progress</span>
            </span>
          </div>
        </div>

        {/* Right Side: Citizen Footprint Interactive Deck */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Citizen Carbon Audit</h3>
                <p className="text-xs text-slate-400">Simulate individual contribution against city average.</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Calculator
              </span>
            </div>

            {/* Inputs Container */}
            <div className="space-y-3 mt-4">
              {/* Transit Method */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Commute Mode</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  <button
                    onClick={() => setTransit('car')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      transit === 'car' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Car</span>
                  </button>
                  <button
                    onClick={() => setTransit('public')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      transit === 'public' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bus className="w-3.5 h-3.5" />
                    <span>Transit</span>
                  </button>
                  <button
                    onClick={() => setTransit('bike')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      transit === 'bike' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Bike/Walk</span>
                  </button>
                </div>
              </div>

              {/* Diet Profile */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dietary Intake</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  <button
                    onClick={() => setDiet('meat')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold cursor-pointer transition-all ${
                      diet === 'meat' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Omnivore
                  </button>
                  <button
                    onClick={() => setDiet('balanced')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold cursor-pointer transition-all ${
                      diet === 'balanced' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Balanced
                  </button>
                  <button
                    onClick={() => setDiet('vegan')}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold cursor-pointer transition-all ${
                      diet === 'vegan' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Plant-Based
                  </button>
                </div>
              </div>

              {/* Home Energy Setup */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Domestic Energy Source</label>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  <button
                    onClick={() => setEnergy('grid')}
                    className={`py-2 px-2 text-xs rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      energy === 'grid' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Standard Grid</span>
                  </button>
                  <button
                    onClick={() => setEnergy('solar')}
                    className={`py-2 px-2 text-xs rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      energy === 'solar' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Rooftop Solar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Result Box */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl mt-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Personal Carbon Footprint:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-emerald-400">{citizenScore}</span>
                <span className="text-[10px] font-bold text-slate-400">kg CO₂/day</span>
              </div>
            </div>
            
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((citizenScore / avgCitizen) * 100, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
              <span>City Benchmark: {avgCitizen} kg</span>
              <span className={pctDifference >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {pctDifference >= 0 ? `${pctDifference}% cleaner than average` : `${Math.abs(pctDifference)}% above target`}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Municipal Offset Initiatives Breakdown */}
      <div className="glass-panel p-5 rounded-2xl">
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Offset Program Portfolio ({cityName})</h3>
        <p className="text-xs text-slate-400 mb-4">Carbon sequestration capacity across city programs (tons CO₂/day).</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {carbon.offsetSources.map((source, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm">{source.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Municipal Allocation</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-emerald-400">+{source.value}</p>
                <p className="text-[10px] text-slate-400">tons/day</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
