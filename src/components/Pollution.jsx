import React, { useState } from 'react';
import { 
  Wind, 
  AlertOctagon, 
  ShieldAlert, 
  MapPin, 
  HelpCircle,
  TrendingDown, 
  ChevronRight,
  ShieldCheck,
  ZapOff,
  Radio,
  Activity,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export default function Pollution({ 
  pollution, 
  kpis, 
  isRealtime = false, 
  rawPollutants, 
  cityName = 'Smart EcoCity' 
}) {
  const [activeCarRestrict, setActiveCarRestrict] = useState(false);
  const [activeFactoryCap, setActiveFactoryCap] = useState(false);

  // Apply manual local overrides for simulation
  const getModifiedSectors = () => {
    return pollution.sectors.map(sec => {
      let tempAqi = sec.aqi;
      let tempPm25 = sec.pm25;

      if (activeCarRestrict && sec.name.includes("Commercial")) {
        tempAqi = Math.round(tempAqi * 0.7);
        tempPm25 = Math.round(tempPm25 * 0.65);
      }
      if (activeFactoryCap && sec.name.includes("Industrial")) {
        tempAqi = Math.round(tempAqi * 0.6);
        tempPm25 = Math.round(tempPm25 * 0.55);
      }

      return {
        ...sec,
        aqi: tempAqi,
        pm25: tempPm25,
        status: tempAqi < 50 ? 'Good' : tempAqi < 100 ? 'Moderate' : tempAqi < 150 ? 'Sensitive Alerts' : 'Unhealthy'
      };
    });
  };

  const currentSectors = getModifiedSectors();
  
  // Calculate average AQI of modified sectors
  const avgAqi = Math.round(currentSectors.reduce((acc, curr) => acc + curr.aqi, 0) / currentSectors.length);

  const getAqiColor = (val) => {
    if (val < 50) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Good' };
    if (val < 100) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Moderate' };
    if (val < 150) return { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Sensitive Groups' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Unhealthy' };
  };

  const avgAqiInfo = getAqiColor(avgAqi);

  return (
    <div className="space-y-6">
      
      {/* Live Chemical Pollutants Cluster (When Live API is Active) */}
      {isRealtime && rawPollutants && (
        <div className="glass-panel border-emerald-500/20 p-5 rounded-2xl shadow-xl bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-950/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Live Atmospheric Chemical Sensor Node ({cityName})
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Open-Meteo Air API
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* PM2.5 */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">PM2.5</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.pm25} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
              <span className={`text-[9px] font-bold ${rawPollutants.pm25 < 15 ? 'text-emerald-400' : rawPollutants.pm25 < 35 ? 'text-amber-400' : 'text-rose-400'}`}>
                {rawPollutants.pm25 < 15 ? 'Optimal' : rawPollutants.pm25 < 35 ? 'Acceptable' : 'Elevated'}
              </span>
            </div>

            {/* PM10 */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">PM10</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.pm10} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
              <span className={`text-[9px] font-bold ${rawPollutants.pm10 < 45 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {rawPollutants.pm10 < 45 ? 'Optimal' : 'Moderate'}
              </span>
            </div>

            {/* NO2 */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">NO₂</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.no2} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
              <span className={`text-[9px] font-bold ${rawPollutants.no2 < 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {rawPollutants.no2 < 25 ? 'Clean' : 'Traffic Load'}
              </span>
            </div>

            {/* CO */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">CO</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.co} <span className="text-[10px] font-normal text-slate-400">mg/m³</span></p>
              <span className="text-[9px] font-bold text-emerald-400">Safe Level</span>
            </div>

            {/* SO2 */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">SO₂</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.so2} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
              <span className="text-[9px] font-bold text-emerald-400">Low Sulphur</span>
            </div>

            {/* O3 Ozone */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">O₃ (Ozone)</span>
              <p className="text-lg font-extrabold text-white mt-1">{rawPollutants.o3} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
              <span className={`text-[9px] font-bold ${rawPollutants.o3 < 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {rawPollutants.o3 < 60 ? 'Normal' : 'Solar Active'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top Telemetry row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AQI Overview summary card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between glow-rose">
          <div>
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
                <Wind className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${avgAqiInfo.bg} ${avgAqiInfo.text} border ${avgAqiInfo.border}`}>
                {avgAqiInfo.label}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-xs text-slate-400 font-semibold tracking-wider uppercase">City-Wide Avg AQI</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">{avgAqi}</h3>
                <span className="text-xs font-semibold text-slate-400">Index Units</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Normal target is under <strong className="text-emerald-400">50 AQI</strong>. Values above 100 represent concentration thresholds requiring immediate dynamic mitigation.
              </p>
            </div>
          </div>
          
          {/* Quick Stats list */}
          <div className="border-t border-slate-800/80 pt-4 mt-4 grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Primary Pollutant</p>
              <p className="font-bold text-slate-200 mt-0.5">PM2.5 Particulates</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Monitoring Hubs</p>
              <p className="font-bold text-slate-200 mt-0.5">4 Active Hubs</p>
            </div>
          </div>
        </div>

        {/* Dynamic Mitigation Simulator Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between lg:col-span-2">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Active District Mitigation</h3>
            <p className="text-xs text-slate-400 mb-4">Toggle temporary local ordinances to simulate the immediate air purification responses.</p>
            
            <div className="space-y-4">
              {/* Traffic Restriction Toggle */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${activeCarRestrict ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'} shrink-0 self-start`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">Zone 2 Combustion Vehicle Ban</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Restrict non-electric commuters in the central business grid during peak hours.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCarRestrict(!activeCarRestrict)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeCarRestrict 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {activeCarRestrict ? 'Ordinance Active' : 'Initiate Restrict'}
                </button>
              </div>

              {/* Industrial Emissions Cap Toggle */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${activeFactoryCap ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'} shrink-0 self-start`}>
                    <ZapOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">Sector 1 Power-Shaving Regulation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Force heavy manufacturing units to operate on high-efficiency scrubbing systems.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveFactoryCap(!activeFactoryCap)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeFactoryCap 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {activeFactoryCap ? 'Regulation Enforced' : 'Enforce Cap'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AQI Trend Area Chart */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight">24-Hour AQI Trend</h3>
            {isRealtime && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Sensor History
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-4">Displays how particulate concentrations progress over a typical day cycle.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pollution.trendData}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
                  fill="url(#colorAqi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">Key Pollutant Limits</h3>
            <p className="text-xs text-slate-400 mb-4">WHO & EPA health thresholds</p>
            
            <div className="space-y-3.5">
              {/* PM2.5 */}
              <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">PM2.5 (Fine Dust)</h4>
                  <p className="text-[10px] text-slate-500">Target Level: &lt; 35 ug/m³</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${kpis.aqi > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {kpis.aqi > 100 ? 'High Risk' : 'Normal'}
                  </p>
                  <p className="text-[9px] text-slate-400">Combustion Source</p>
                </div>
              </div>

              {/* PM10 */}
              <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">PM10 (Coarse Dust)</h4>
                  <p className="text-[10px] text-slate-500">Target Level: &lt; 150 ug/m³</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-amber-400">Moderate</p>
                  <p className="text-[9px] text-slate-400">Roadways & Construction</p>
                </div>
              </div>

              {/* NO2 */}
              <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">NO₂ (Nitrogen Dioxide)</h4>
                  <p className="text-[10px] text-slate-500">Target Level: &lt; 53 ppb</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">Optimal</p>
                  <p className="text-[9px] text-slate-400">Vehicle Exhaust</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5 text-[10px] text-slate-400 mt-4 leading-normal">
            <AlertOctagon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>AQI indices are compiled using a running 24-hour average of fine particulate data.</p>
          </div>
        </div>
      </div>

      {/* Sector details table */}
      <div className="glass-panel p-5 rounded-2xl">
        <h3 className="text-lg font-bold text-white tracking-tight mb-2">District Hub Telemetry Logs</h3>
        <p className="text-xs text-slate-400 mb-4">Detailed monitoring values mapped across the 4 smart city sectors in {cityName}.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-4">District / Sector</th>
                <th className="pb-3 px-4">AQI Level</th>
                <th className="pb-3 px-4">Status Check</th>
                <th className="pb-3 px-4">PM2.5 (ug)</th>
                <th className="pb-3 px-4">PM10 (ug)</th>
                <th className="pb-3 px-4">NO₂ (ppb)</th>
                <th className="pb-3 pl-4">CO (ppm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
              {currentSectors.map((sec, idx) => {
                const statusInfo = getAqiColor(sec.aqi);
                return (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 pr-4 text-white font-bold flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {sec.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-slate-200">{sec.aqi}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusInfo.bg} ${statusInfo.text} border ${statusInfo.border}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{sec.pm25}</td>
                    <td className="py-3.5 px-4 font-mono">{sec.pm10}</td>
                    <td className="py-3.5 px-4 font-mono">{sec.no2}</td>
                    <td className="py-3.5 pl-4 font-mono">{sec.co}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
