import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Pollution from './components/Pollution';
import Electricity from './components/Electricity';
import Water from './components/Water';
import Carbon from './components/Carbon';
import AISuggestions from './components/AISuggestions';
import AuthModal from './components/AuthModal';
import { simulationStates } from './data/simulationData';
import { 
  PRESET_CITIES, 
  fetchLiveCityData, 
  getUserCoordinates, 
  reverseGeocode 
} from './services/realtimeApi';
import { CheckCircle2, Info, AlertTriangle, Radio } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dataMode, setDataMode] = useState('realtime'); // 'realtime' or 'simulation'
  const [currentSimState, setCurrentSimState] = useState('normal');
  const [appliedSuggestions, setAppliedSuggestions] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real-time API States
  const [selectedCity, setSelectedCity] = useState(PRESET_CITIES[0]); // Default: London
  const [realtimeData, setRealtimeData] = useState(null);
  const [isLoadingRealtime, setIsLoadingRealtime] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [latencyMs, setLatencyMs] = useState(48);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sustainx_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sustainx_auth_user');
      const skipped = sessionStorage.getItem('sustainx_guest_skipped') === 'true';
      return !savedUser && !skipped;
    } catch {
      return true;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Fetch real-time telemetry from live APIs
  const loadRealtimeData = useCallback(async (city, notifySuccess = false) => {
    setIsLoadingRealtime(true);
    try {
      const data = await fetchLiveCityData(city);
      setRealtimeData(data);
      setLatencyMs(data.latencyMs || 42);
      if (notifySuccess) {
        showToast(`Connected to live telemetry for ${city.name} (${data.latencyMs}ms)`, 'success');
      }
    } catch (err) {
      console.error('Error fetching real-time data:', err);
      showToast('Live telemetry offline. Using fallback cache.', 'warning');
    } finally {
      setIsLoadingRealtime(false);
    }
  }, [showToast]);

  // Initial fetch and on selected city change
  useEffect(() => {
    if (dataMode === 'realtime') {
      loadRealtimeData(selectedCity, false);
    }
  }, [selectedCity, dataMode, loadRealtimeData]);

  // Auto-refresh interval (every 45s) when in real-time mode
  useEffect(() => {
    if (dataMode !== 'realtime') return;
    const interval = setInterval(() => {
      loadRealtimeData(selectedCity, false);
    }, 45000);
    return () => clearInterval(interval);
  }, [dataMode, selectedCity, loadRealtimeData]);

  // Detect GPS location
  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    showToast('Requesting GPS sensor telemetry...', 'info');
    try {
      const coords = await getUserCoordinates();
      const geocoded = await reverseGeocode(coords.lat, coords.lon);
      const customCity = {
        id: 'gps_detected',
        name: geocoded.name,
        country: geocoded.country,
        lat: coords.lat,
        lon: coords.lon,
      };
      setSelectedCity(customCity);
      await loadRealtimeData(customCity, true);
    } catch (err) {
      console.warn('Geolocation failed:', err);
      showToast('Location access denied or unavailable. Using selected city.', 'warning');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleManualRefresh = () => {
    loadRealtimeData(selectedCity, true);
  };

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    localStorage.setItem('sustainx_auth_user', JSON.stringify(authenticatedUser));
    setShowAuthModal(false);
    showToast(`Welcome back, ${authenticatedUser.name}! Session active.`, 'success');
  };

  const handleSkip = () => {
    sessionStorage.setItem('sustainx_guest_skipped', 'true');
    setShowAuthModal(false);
    showToast('Continuing as Guest Citizen. Full telemetry active.', 'info');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sustainx_auth_user');
    sessionStorage.removeItem('sustainx_guest_skipped');
    showToast('Signed out successfully.', 'info');
  };

  // Close sidebar when active tab changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  // Reset applied suggestions when simulation state or city changes
  useEffect(() => {
    setAppliedSuggestions({});
  }, [currentSimState, selectedCity?.id, dataMode]);

  // Handle AI suggestion toggle
  const toggleSuggestion = (id) => {
    setAppliedSuggestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get active base dataset: Real-time API dataset OR simulated scenario
  const isRealtimeActive = dataMode === 'realtime';
  const baseData = (isRealtimeActive && realtimeData) 
    ? realtimeData 
    : (simulationStates[currentSimState] || simulationStates.normal);

  // Dynamically calculate reactive KPIs based on applied optimizations
  const getReactiveKpis = () => {
    let reactive = { ...baseData.kpis };

    Object.keys(appliedSuggestions).forEach(id => {
      if (appliedSuggestions[id]) {
        const sug = (baseData.suggestions || []).find(s => s.id === id);
        if (sug && sug.impact) {
          Object.keys(sug.impact).forEach(metric => {
            if (metric === 'powerDemand') {
              reactive.powerDemand = Math.max(reactive.powerDemand + sug.impact.powerDemand, 0);
            } else if (metric === 'aqi') {
              reactive.aqi = Math.max(reactive.aqi + sug.impact.aqi, 0);
            } else if (metric === 'carbonSaved') {
              reactive.carbonSaved = Math.max(reactive.carbonSaved + sug.impact.carbonSaved, 0);
            } else if (metric === 'waterLevel') {
              reactive.waterLevel = Math.min(reactive.waterLevel + sug.impact.waterLevel, 100);
            } else if (metric === 'activeLeaks') {
              reactive.activeLeaks = Math.max(reactive.activeLeaks + sug.impact.activeLeaks, 0);
            }
          });
        }
      }
    });

    return reactive;
  };

  const currentKpis = getReactiveKpis();

  // Active optimizations count
  const activeOptimizationsCount = Object.values(appliedSuggestions).filter(Boolean).length;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'pollution':
        return (
          <Pollution 
            pollution={baseData.pollution} 
            kpis={currentKpis} 
            isRealtime={isRealtimeActive}
            rawPollutants={baseData.rawPollutants}
            cityName={baseData.city?.name || selectedCity?.name}
          />
        );
      case 'electricity':
        return (
          <Electricity 
            electricity={baseData.electricity} 
            kpis={currentKpis} 
            isRealtime={isRealtimeActive}
            weather={baseData.weather}
            cityName={baseData.city?.name || selectedCity?.name}
          />
        );
      case 'water':
        return (
          <Water 
            water={baseData.water} 
            kpis={currentKpis} 
            isRealtime={isRealtimeActive}
            weather={baseData.weather}
            cityName={baseData.city?.name || selectedCity?.name}
          />
        );
      case 'carbon':
        return (
          <Carbon 
            carbon={baseData.carbon} 
            kpis={currentKpis} 
            isRealtime={isRealtimeActive}
            weather={baseData.weather}
            rawPollutants={baseData.rawPollutants}
            cityName={baseData.city?.name || selectedCity?.name}
          />
        );
      case 'ai':
        return (
          <AISuggestions 
            suggestions={baseData.suggestions || []} 
            appliedSuggestions={appliedSuggestions} 
            toggleSuggestion={toggleSuggestion} 
            isRealtime={isRealtimeActive}
            cityName={baseData.city?.name || selectedCity?.name}
          />
        );
      default:
        return (
          <Overview 
            kpis={currentKpis} 
            pollution={baseData.pollution} 
            electricity={baseData.electricity} 
            water={baseData.water} 
            carbon={baseData.carbon} 
            simStateName={currentSimState} 
            setActiveTab={setActiveTab}
            isRealtime={isRealtimeActive}
            weather={baseData.weather}
            city={baseData.city || selectedCity}
            latencyMs={latencyMs}
            lastUpdated={baseData.lastUpdated}
            isLoadingRealtime={isLoadingRealtime}
            onRefresh={handleManualRefresh}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 lg:left-64 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel bg-slate-900/95 border border-emerald-500/40 shadow-2xl shadow-slate-950/80 text-sm font-semibold text-white animate-in slide-in-from-bottom-4 duration-300">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : toastMessage.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-sky-400 shrink-0" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Auth / Login Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onSkip={handleSkip}
        allowClose={Boolean(user || sessionStorage.getItem('sustainx_guest_skipped'))}
      />

      {/* Mobile Sidebar backdrop overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-350"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        isRealtime={isRealtimeActive}
      />

      {/* Main Panel Content */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        
        {/* Header bar with Real-time & Simulation Switchers */}
        <Header 
          activeTab={activeTab} 
          currentSimState={currentSimState} 
          setCurrentSimState={setCurrentSimState} 
          activeOptimizationsCount={activeOptimizationsCount} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          // Real-time API props
          dataMode={dataMode}
          setDataMode={setDataMode}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          presetCities={PRESET_CITIES}
          onDetectLocation={handleDetectLocation}
          isDetectingLocation={isDetectingLocation}
          onRefresh={handleManualRefresh}
          isLoadingRealtime={isLoadingRealtime}
          latencyMs={latencyMs}
        />

        {/* Dynamic page container */}
        <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>

        {/* Footer */}
        <footer className="glass-panel border-t border-slate-900/60 p-4 text-center text-[10px] text-slate-500 font-semibold tracking-wider bg-slate-950/20">
          SustainX Smart EcoCity Monitoring • Real-Time Satellite & Sensor Telemetry via Open-Meteo & UK ESO APIs © 2026
        </footer>
      </div>
    </div>
  );
}

export default App;
