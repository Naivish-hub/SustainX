import React from 'react';
import { 
  Wind, 
  Zap, 
  Droplet, 
  Leaf, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info,
  Clock,
  Radio,
  Sun,
  CloudRain,
  Gauge,
  RotateCw,
  Waves,
  Thermometer
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Overview({ 
  kpis, 
  pollution, 
  electricity, 
  water, 
  carbon, 
  simStateName, 
  setActiveTab,
  isRealtime = false,
  weather,
  city,
  latencyMs = 42,
  lastUpdated,
  isLoadingRealtime = false,
  onRefresh
}) {
  
  // Format AQI color & description
  const getAqiColor = (val) => {
    if (val < 50) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'glow-emerald', label: 'Good' };
    if (val < 100) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'glow-amber', label: 'Moderate' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', glow: 'glow-rose', label: 'Unhealthy' };
  };

  const aqiInfo = getAqiColor(kpis.aqi);

  // Notifications feed based on active state or live API
  const getLogsForState = () => {
    if (isRealtime) {
      return [
        { 
          time: lastUpdated || 'Just now', 
          category: 'Sat Telemetry', 
          type: 'success', 
          msg: `Live telemetry synchronized for ${city?.name || 'Local Grid'} (${latencyMs}ms latency via Open-Meteo & UK ESO APIs).` 
        },
        { 
          time: 'Active', 
          category: 'Clean Energy', 
          type: 'info', 
          msg: `Solar radiation at ${weather?.solarRadiation ?? 320} W/m² and wind at ${weather?.windSpeed ?? 14} km/h generating ${kpis.renewablePercentage}% green power.` 
        },
        { 
          time: 'Hydrology', 
          category: 'Water', 
          type: weather?.precipitation > 2 ? 'warning' : 'success', 
          msg: `River discharge at ${weather?.riverDischarge ?? 7.4} m³/s with ${weather?.precipitation ?? 0} mm/h precipitation.` 
        }
      ];
    }

    switch (simStateName) {
      case 'rush_hour':
        return [
          { time: '11:42 AM', category: 'Traffic', type: 'warning', msg: 'Traffic gridlock detected in Sector 2 Commercial. Transit emission alarm triggered.' },
          { time: '11:40 AM', category: 'Grid', type: 'info', msg: 'Grid demand spikes to 460 MW due to commercial activity.' },
          { time: '11:35 AM', category: 'Pollution', type: 'warning', msg: 'PM2.5 levels in Sector 3 residential rise past 45 ug/m³.' }
        ];
      case 'heatwave':
        return [
          { time: '11:42 AM', category: 'Energy', type: 'critical', msg: 'High temperature alert. Grid demand at 95% capacity. Secondary generators online.' },
          { time: '11:39 AM', category: 'Water', type: 'warning', msg: 'Residential consumption rates at critical level (115 m³/h). Pressure adjusted.' },
          { time: '11:30 AM', category: 'Resources', type: 'info', msg: 'Solar parks reaching peak production at 240 MW.' }
        ];
      case 'rainstorm':
        return [
          { time: '11:42 AM', category: 'Water', type: 'info', msg: 'Central Reserv. storage climbs to 96%. Storm redirect systems active.' },
          { time: '11:38 AM', category: 'Energy', type: 'info', msg: 'Wind turbines reach maximum generation capacity (190 MW).' },
          { time: '11:32 AM', category: 'Pollution', type: 'success', msg: 'Precipitation clearing particulate matter. AQI dropped to 16.' }
        ];
      case 'industrial_peak':
        return [
          { time: '11:42 AM', category: 'Pollution', type: 'critical', msg: 'Sector 1 (Industrial) AQI reaches 220 (Hazardous). Emissions scrubbers recommended.' },
          { time: '11:39 AM', category: 'Energy', type: 'warning', msg: 'Industrial energy load consumes 260 MW, placing heavy strain on renewable resources.' },
          { time: '11:31 AM', category: 'Carbon', type: 'info', msg: 'Carbon capture plants active at peak throughput (+45 tons offset).' }
        ];
      default:
        return [
          { time: '11:42 AM', category: 'System', type: 'success', msg: 'Telemetry sync complete. All system variables operating within nominal range.' },
          { time: '11:38 AM', category: 'Grid', type: 'info', msg: 'Renewable resources contributing 58% of energy generation.' },
          { time: '11:25 AM', category: 'Water', type: 'success', msg: 'No pressure drop or flow anomalies detected in water grid sectors.' }
        ];
    }
  };

  const logs = getLogsForState();

  return (
    <div className="space-y-6">
      
      {/* Live Atmospheric Ground Station Banner or Simulation Info */}
      {isRealtime ? (
        <div className="glass-panel border-emerald-500/30 p-5 rounded-2xl shadow-xl bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-slate-950/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Live Satellite & Ground Sensor Station
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">Ping: {latencyMs}ms</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {city?.name ? `${city.name}, ${city.country}` : 'Global Sensor Telemetry'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connected directly to Open-Meteo Air Quality & Solar APIs and UK ESO National Grid telemetry.
                </p>
              </div>
            </div>

            {/* Quick Micro-Weather Sensor Readouts */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Temp</p>
                  <p className="text-xs font-bold text-white">{weather?.temp ?? 21.5}°C</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Solar Rad</p>
                  <p className="text-xs font-bold text-white">{weather?.solarRadiation ?? 320} W/m²</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Wind</p>
                  <p className="text-xs font-bold text-white">{weather?.windSpeed ?? 14.2} km/h</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <Waves className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Hydro Inflow</p>
                  <p className="text-xs font-bold text-white">{weather?.riverDischarge ?? 7.4} m³/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel border-purple-500/20 p-5 rounded-2xl flex items-start gap-4 shadow-xl bg-purple-950/10">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <Info className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <h3 className="text-md font-semibold text-purple-200">Simulation Stress-Test Telemetry</h3>
            <p className="text-sm text-slate-400 mt-1">
              Currently simulating the <strong className="text-white capitalize">{simStateName.replace('_', ' ')}</strong> state. Switch to <strong className="text-emerald-400">Live APIs</strong> in the top header anytime to see real-time city data.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AQI KPI */}
        <div 
          onClick={() => setActiveTab('pollution')}
          className={`glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover glow-rose`}
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
              <Wind className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${aqiInfo.bg} ${aqiInfo.text} border ${aqiInfo.border}`}>
              {aqiInfo.label}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Air Quality Index (AQI)</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">{kpis.aqi}</h3>
              <p className="text-[10px] text-slate-500 font-semibold">PM2.5 Limit: 35 µg</p>
            </div>
            {/* AQI Progress Bar */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  kpis.aqi < 50 ? 'bg-emerald-400' : kpis.aqi < 100 ? 'bg-amber-400' : 'bg-rose-400'
                }`}
                style={{ width: `${Math.min((kpis.aqi / 200) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Energy Grid KPI */}
        <div 
          onClick={() => setActiveTab('electricity')}
          className="glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover glow-amber"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs text-emerald-400 font-bold">
              <span>{kpis.renewablePercentage}% Green</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Power Grid Demand</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">{kpis.powerDemand}</h3>
              <span className="text-xs font-bold text-slate-300">MW</span>
              <span className="text-[10px] text-slate-500 font-medium">Supply: {kpis.powerGeneration} MW</span>
            </div>
            {/* Generation Indicator */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  kpis.powerGeneration >= kpis.powerDemand ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
                style={{ width: `${Math.min((kpis.powerDemand / (kpis.powerGeneration || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Water KPI */}
        <div 
          onClick={() => setActiveTab('water')}
          className="glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover glow-cyan"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
              <Droplet className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpis.activeLeaks > 3 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
              {kpis.activeLeaks} Leaks Identified
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Reservoir Levels</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">{kpis.waterLevel}</h3>
              <span className="text-xs font-bold text-slate-300">%</span>
              <span className="text-[10px] text-slate-500 font-medium">Cap: 1.2M m³</span>
            </div>
            {/* Water Indicator */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${kpis.waterLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carbon Offset KPI */}
        <div 
          onClick={() => setActiveTab('carbon')}
          className="glass-panel p-5 rounded-2xl cursor-pointer glass-panel-hover glow-emerald"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs text-emerald-400 font-bold">
              <ArrowDownRight className="w-4 h-4" />
              <span>-18% YTD</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Carbon Offset Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">{kpis.carbonSaved}</h3>
              <span className="text-xs font-bold text-slate-300">tons/day</span>
            </div>
            {/* Target Indicator */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((kpis.carbonSaved / 200) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid - Trends & Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Air Quality Trend Area Chart */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">24-Hour Air Quality Telemetry</h3>
              <p className="text-xs text-slate-400">
                {isRealtime ? 'Direct Open-Meteo hourly sensor readings' : 'Hourly progression of particulate concentration across municipal sectors'}
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('pollution')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Detailed view</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pollution.trendData}>
                <defs>
                  <linearGradient id="overviewAqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: '#f43f5e' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="AQI" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#overviewAqiGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clean Energy Mix Donut */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white tracking-tight">Energy Generation Mix</h3>
              <button 
                onClick={() => setActiveTab('electricity')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Grid</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-2">Live source breakdown</p>

            <div className="h-44 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={electricity.sources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {electricity.sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-white">{kpis.renewablePercentage}%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Renewable</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80">
            {electricity.sources.slice(0, 4).map((source, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-slate-400 truncate text-[11px]">{source.name}:</span>
                <span className="text-white font-bold ml-auto text-[11px]">{source.value} MW</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sector Air Quality & Live Telemetry Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sector Pollution Table */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2">
          <h3 className="text-base font-bold text-white tracking-tight mb-1">District Air Quality Monitors</h3>
          <p className="text-xs text-slate-400 mb-4">Sensor nodes measuring particulate matter and gaseous emissions</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Sector / District</th>
                  <th className="pb-3 text-center">AQI</th>
                  <th className="pb-3 text-center">PM2.5</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 pr-2 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-xs">
                {pollution.sectors.map((sector, idx) => {
                  const secAqiInfo = getAqiColor(sector.aqi);
                  return (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 pl-2 font-medium text-slate-200">{sector.name}</td>
                      <td className="py-3 text-center font-bold text-white">{sector.aqi}</td>
                      <td className="py-3 text-center text-slate-300">{sector.pm25} µg/m³</td>
                      <td className="py-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${secAqiInfo.bg} ${secAqiInfo.text} border ${secAqiInfo.border}`}>
                          {sector.status}
                        </span>
                      </td>
                      <td className="py-3 pr-2 text-right font-medium text-slate-400">
                        {sector.aqi < 50 ? (
                          <span className="text-emerald-400 flex items-center justify-end gap-1">Optimal</span>
                        ) : sector.aqi < 100 ? (
                          <span className="text-amber-400 flex items-center justify-end gap-1">Moderate</span>
                        ) : (
                          <span className="text-rose-400 flex items-center justify-end gap-1">Elevated</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Logs & Telemetry Events */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-bold text-white tracking-tight">Active Telemetry Feed</h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mb-4">Real-time alerts, sensor sync, and grid events</p>

            <div className="space-y-3">
              {logs.map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{log.category}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <button 
              onClick={() => setActiveTab('ai')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open AI Smart Advisor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
