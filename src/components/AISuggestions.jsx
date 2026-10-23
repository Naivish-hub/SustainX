import React from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  HelpCircle,
  TrendingDown, 
  CheckCircle2, 
  Zap, 
  Wind, 
  Droplet, 
  Leaf,
  Activity,
  Radio
} from 'lucide-react';

export default function AISuggestions({ 
  suggestions = [], 
  appliedSuggestions = {}, 
  toggleSuggestion,
  isRealtime = false,
  cityName = 'Smart EcoCity'
}) {

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Energy': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Pollution': return <Wind className="w-4 h-4 text-rose-400" />;
      case 'Water': return <Droplet className="w-4 h-4 text-teal-400" />;
      default: return <Leaf className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI banner */}
      <div className="glass-panel border-purple-500/20 p-5 rounded-2xl flex items-start gap-4 shadow-xl glow-purple bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b]/40 to-[#0f172a]">
        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl shrink-0">
          <BrainCircuit className="w-7 h-7 animate-pulse-slow" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight">AI Smart Advisor Grid</h3>
            {isRealtime && (
              <span className="text-[10px] text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
                Live Sensor Agent ({cityName})
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isRealtime 
              ? `The neural city agent continuously monitors live weather, air quality, and grid sensors across ${cityName}. Recommendations below adapt dynamically to real atmospheric conditions.`
              : 'The neural city agent continuously monitors sensors across utilities, road cameras, and AQI grids. Apply suggestions below to run real-time grid mitigations and see the instant response in other telemetry dashboard sections.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Suggestions feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-md font-bold text-white tracking-wider uppercase">Active Optimization Proposals</h3>
            <span className="text-xs text-purple-400 font-semibold">{suggestions.length} available</span>
          </div>
          
          {suggestions.length === 0 ? (
            <div className="glass-panel p-8 text-center rounded-2xl text-slate-400">
              <Cpu className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-spin" />
              <p className="text-sm font-semibold">No active optimization recommendations needed.</p>
              <p className="text-xs text-slate-500 mt-1">Grid metrics are running at optimal values for this environment state.</p>
            </div>
          ) : (
            suggestions.map((sug) => {
              const isApplied = !!appliedSuggestions[sug.id];
              return (
                <div 
                  key={sug.id} 
                  className={`glass-panel p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-300 ${
                    isApplied 
                      ? 'border-purple-500/40 bg-purple-950/10 shadow-lg shadow-purple-500/5' 
                      : 'hover:border-slate-700/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`p-2.5 rounded-xl self-start ${isApplied ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-900 text-slate-400'} border border-slate-800 shrink-0`}>
                      {getCategoryIcon(sug.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                          {sug.category}
                        </span>
                        {isApplied && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Implemented
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-100 mt-1.5 text-sm sm:text-base leading-snug">{sug.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-normal">{sug.description}</p>
                      
                      <div className="text-[10px] font-bold text-emerald-400 mt-2">
                        Estimated Impact: {sug.savingText}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSuggestion(sug.id, sug.impact)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isApplied 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 hover:bg-purple-500' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {isApplied ? 'Revert Action' : 'Apply Optimization'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Right column: Neural status */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-white tracking-wider uppercase mb-3">AI Agent Telemetry</h3>
            
            <div className="space-y-4">
              {/* Neural network nodes visual */}
              <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="flex flex-col gap-3 relative z-10 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold">Neural Load:</span>
                    <span className="font-mono text-purple-400 font-bold">14.2 GFLOPs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold">Sensor Grid Density:</span>
                    <span className="font-mono text-teal-400 font-bold">98.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold">Inference Delay:</span>
                    <span className="font-mono text-emerald-400 font-bold">12 ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold">Telemetry Mode:</span>
                    <span className="font-mono text-emerald-400 font-bold">{isRealtime ? 'Live Satellite' : 'Simulation'}</span>
                  </div>
                </div>
              </div>

              {/* Status parameters */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    <span>Optimization Efficiency</span>
                    <span className="text-purple-400">88%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    <span>Grid Autonomy Level</span>
                    <span className="text-teal-400">Level 4</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5 text-[10px] text-slate-400 mt-6 leading-normal">
            <Activity className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 animate-pulse-slow" />
            <p>Smart City nodes communicate via secure peer-to-peer mesh networking to prevent single points of failure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
