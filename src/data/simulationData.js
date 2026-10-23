// Simulation Data for SustainX Dashboard

export const simulationStates = {
  normal: {
    label: "Normal Operations",
    description: "Standard weekday city operations with stable utility grids and moderate pollution.",
    kpis: {
      aqi: 54,
      aqiStatus: "Good",
      powerDemand: 420,
      powerGeneration: 435,
      waterLevel: 72,
      carbonSaved: 124,
      activeLeaks: 2,
      renewablePercentage: 58,
    },
    pollution: {
      sectors: [
        { name: "Sector 1 (Industrial)", aqi: 85, status: "Moderate", pm25: 28, pm10: 55, no2: 30, co: 0.8 },
        { name: "Sector 2 (Commercial)", aqi: 55, status: "Good", pm25: 14, pm10: 38, no2: 22, co: 0.5 },
        { name: "Sector 3 (Residential)", aqi: 42, status: "Good", pm25: 10, pm10: 25, no2: 12, co: 0.3 },
        { name: "Sector 4 (Green Zone)", aqi: 22, status: "Good", pm25: 5, pm10: 12, no2: 6, co: 0.1 }
      ],
      trendData: [
        { time: "00:00", AQI: 35 }, { time: "04:00", AQI: 32 }, { time: "08:00", AQI: 58 },
        { time: "12:00", AQI: 62 }, { time: "16:00", AQI: 54 }, { time: "20:00", AQI: 48 }
      ]
    },
    electricity: {
      sources: [
        { name: "Solar Power", value: 180, color: "#f59e0b" },
        { name: "Wind Farms", value: 120, color: "#10b981" },
        { name: "Hydroelectric", value: 65, color: "#06b6d4" },
        { name: "Natural Gas", value: 70, color: "#6b7280" },
        { name: "Nuclear", value: 0, color: "#8b5cf6" }
      ],
      loadTrend: [
        { time: "00:00", demand: 280, generation: 320 },
        { time: "04:00", demand: 250, generation: 310 },
        { time: "08:00", demand: 390, generation: 410 },
        { time: "12:00", demand: 420, generation: 435 },
        { time: "16:00", demand: 440, generation: 440 },
        { time: "20:00", demand: 380, generation: 390 }
      ],
      zoneConsumption: [
        { name: "Residential", value: 150 },
        { name: "Commercial", value: 130 },
        { name: "Industrial", value: 110 },
        { name: "Streetlights", value: 30 }
      ]
    },
    water: {
      reservoirLevels: [
        { name: "Central Reserv.", level: 75, max: 100 },
        { name: "East Basin", level: 68, max: 100 },
        { name: "Valley Aquifer", level: 72, max: 100 }
      ],
      consumptionTrend: [
        { day: "Mon", consumption: 180 }, { day: "Tue", consumption: 182 }, { day: "Wed", consumption: 185 },
        { day: "Thu", consumption: 181 }, { day: "Fri", consumption: 188 }, { day: "Sat", consumption: 172 },
        { day: "Sun", consumption: 165 }
      ],
      sectors: [
        { name: "Residential", consumption: 85, flowRate: 12.4, status: "Normal" },
        { name: "Commercial", consumption: 45, flowRate: 8.2, status: "Normal" },
        { name: "Industrial", consumption: 40, flowRate: 6.8, status: "Optimal" },
        { name: "Parks & Ag", consumption: 15, flowRate: 3.1, status: "Normal" }
      ]
    },
    carbon: {
      offsetSources: [
        { name: "Forest Reserves", value: 65 },
        { name: "Rooftop Solar", value: 25 },
        { name: "EV Shuttles", value: 20 },
        { name: "Carbon Capture", value: 14 }
      ],
      pathwayData: [
        { year: "2022", target: 450, actual: 448 },
        { year: "2023", target: 400, actual: 392 },
        { year: "2024", target: 350, actual: 338 },
        { year: "2025", target: 300, actual: 288 },
        { year: "2026", target: 250, actual: 236 }
      ]
    },
    suggestions: [
      {
        id: "power_grid_opt",
        category: "Energy",
        title: "Dim Streetlights During Off-Peak Hours",
        description: "Reduce light intensity by 30% between 1 AM and 5 AM in residential blocks.",
        savingText: "-8 MW Demand • -4 tons CO2/day",
        impact: { powerDemand: -8, carbonSaved: 4 },
        applied: false
      },
      {
        id: "ev_bus_fleet",
        category: "Pollution",
        title: "Dispatch Electric Shuttles in Sector 2",
        description: "Increase dynamic bus loops to replace single-occupancy commuters.",
        savingText: "-5 AQI • +6 tons CO2/day saved",
        impact: { aqi: -5, carbonSaved: 6 },
        applied: false
      }
    ]
  },

  rush_hour: {
    label: "Rush Hour Traffic",
    description: "Peak traffic congestion gridlock across administrative and commercial sectors.",
    kpis: {
      aqi: 138,
      aqiStatus: "Unhealthy",
      powerDemand: 460,
      powerGeneration: 470,
      waterLevel: 71,
      carbonSaved: 85,
      activeLeaks: 2,
      renewablePercentage: 51,
    },
    pollution: {
      sectors: [
        { name: "Sector 1 (Industrial)", aqi: 110, status: "Unhealthy for Sensitive Groups", pm25: 39, pm10: 78, no2: 52, co: 1.5 },
        { name: "Sector 2 (Commercial)", aqi: 155, status: "Unhealthy", pm25: 64, pm10: 110, no2: 78, co: 2.1 },
        { name: "Sector 3 (Residential)", aqi: 125, status: "Unhealthy for Sensitive Groups", pm25: 45, pm10: 85, no2: 44, co: 1.3 },
        { name: "Sector 4 (Green Zone)", aqi: 52, status: "Moderate", pm25: 13, pm10: 32, no2: 12, co: 0.4 }
      ],
      trendData: [
        { time: "00:00", AQI: 35 }, { time: "04:00", AQI: 30 }, { time: "08:00", AQI: 138 },
        { time: "12:00", AQI: 95 }, { time: "16:00", AQI: 115 }, { time: "20:00", AQI: 72 }
      ]
    },
    electricity: {
      sources: [
        { name: "Solar Power", value: 160, color: "#f59e0b" },
        { name: "Wind Farms", value: 100, color: "#10b981" },
        { name: "Hydroelectric", value: 65, color: "#06b6d4" },
        { name: "Natural Gas", value: 120, color: "#6b7280" },
        { name: "Nuclear", value: 25, color: "#8b5cf6" }
      ],
      loadTrend: [
        { time: "00:00", demand: 280, generation: 320 },
        { time: "04:00", demand: 250, generation: 310 },
        { time: "08:00", demand: 460, generation: 470 },
        { time: "12:00", demand: 430, generation: 445 },
        { time: "16:00", demand: 475, generation: 480 },
        { time: "20:00", demand: 410, generation: 420 }
      ],
      zoneConsumption: [
        { name: "Residential", value: 140 },
        { name: "Commercial", value: 180 },
        { name: "Industrial", value: 100 },
        { name: "Streetlights", value: 40 }
      ]
    },
    water: {
      reservoirLevels: [
        { name: "Central Reserv.", level: 74, max: 100 },
        { name: "East Basin", level: 67, max: 100 },
        { name: "Valley Aquifer", level: 71, max: 100 }
      ],
      consumptionTrend: [
        { day: "Mon", consumption: 195 }, { day: "Tue", consumption: 198 }, { day: "Wed", consumption: 192 },
        { day: "Thu", consumption: 190 }, { day: "Fri", consumption: 202 }, { day: "Sat", consumption: 170 },
        { day: "Sun", consumption: 162 }
      ],
      sectors: [
        { name: "Residential", consumption: 82, flowRate: 11.9, status: "Normal" },
        { name: "Commercial", consumption: 58, flowRate: 9.8, status: "High" },
        { name: "Industrial", consumption: 38, flowRate: 6.2, status: "Optimal" },
        { name: "Parks & Ag", consumption: 12, flowRate: 2.8, status: "Normal" }
      ]
    },
    carbon: {
      offsetSources: [
        { name: "Forest Reserves", value: 65 },
        { name: "Rooftop Solar", value: 22 },
        { name: "EV Shuttles", value: 28 },
        { name: "Carbon Capture", value: 14 }
      ],
      pathwayData: [
        { year: "2022", target: 450, actual: 448 },
        { year: "2023", target: 400, actual: 395 },
        { year: "2024", target: 350, actual: 348 },
        { year: "2025", target: 300, actual: 305 },
        { year: "2026", target: 250, actual: 262 }
      ]
    },
    suggestions: [
      {
        id: "traffic_reroute",
        category: "Pollution",
        title: "Initiate Dynamic Traffic Signal Rerouting",
        description: "Adjust green light durations on Sector 2 arterial roads to reduce idle emissions.",
        savingText: "-25 AQI • +12 tons CO2/day saved",
        impact: { aqi: -25, carbonSaved: 12 },
        applied: false
      },
      {
        id: "subway_incentive",
        category: "Carbon Footprint",
        title: "Deploy Transit Subsidies / Incentives",
        description: "Offer temporary free rides during peak rush periods to pull commuters off roads.",
        savingText: "-18 AQI • +15 tons CO2/day saved",
        impact: { aqi: -18, carbonSaved: 15 },
        applied: false
      }
    ]
  },

  heatwave: {
    label: "Summer Heatwave",
    description: "Extremely high temperature event causing spike in utility usage and low winds.",
    kpis: {
      aqi: 88,
      aqiStatus: "Moderate",
      powerDemand: 560,
      powerGeneration: 545,
      waterLevel: 62,
      carbonSaved: 140,
      activeLeaks: 4,
      renewablePercentage: 66,
    },
    pollution: {
      sectors: [
        { name: "Sector 1 (Industrial)", aqi: 115, status: "Unhealthy for Sensitive Groups", pm25: 41, pm10: 72, no2: 38, co: 1.1 },
        { name: "Sector 2 (Commercial)", aqi: 92, status: "Moderate", pm25: 32, pm10: 58, no2: 28, co: 0.8 },
        { name: "Sector 3 (Residential)", aqi: 82, status: "Moderate", pm25: 27, pm10: 48, no2: 20, co: 0.6 },
        { name: "Sector 4 (Green Zone)", aqi: 45, status: "Good", pm25: 11, pm10: 24, no2: 8, co: 0.2 }
      ],
      trendData: [
        { time: "00:00", AQI: 55 }, { time: "04:00", AQI: 48 }, { time: "08:00", AQI: 72 },
        { time: "12:00", AQI: 88 }, { time: "16:00", AQI: 95 }, { time: "20:00", AQI: 82 }
      ]
    },
    electricity: {
      sources: [
        { name: "Solar Power", value: 240, color: "#f59e0b" },
        { name: "Wind Farms", value: 50, color: "#10b981" },
        { name: "Hydroelectric", value: 55, color: "#06b6d4" },
        { name: "Natural Gas", value: 140, color: "#6b7280" },
        { name: "Nuclear", value: 60, color: "#8b5cf6" }
      ],
      loadTrend: [
        { time: "00:00", demand: 380, generation: 390 },
        { time: "04:00", demand: 350, generation: 370 },
        { time: "08:00", demand: 490, generation: 480 },
        { time: "12:00", demand: 560, generation: 545 },
        { time: "16:00", demand: 580, generation: 560 },
        { time: "20:00", demand: 510, generation: 500 }
      ],
      zoneConsumption: [
        { name: "Residential", value: 240 },
        { name: "Commercial", value: 190 },
        { name: "Industrial", value: 100 },
        { name: "Streetlights", value: 30 }
      ]
    },
    water: {
      reservoirLevels: [
        { name: "Central Reserv.", level: 64, max: 100 },
        { name: "East Basin", level: 58, max: 100 },
        { name: "Valley Aquifer", level: 64, max: 100 }
      ],
      consumptionTrend: [
        { day: "Mon", consumption: 210 }, { day: "Tue", consumption: 215 }, { day: "Wed", consumption: 228 },
        { day: "Thu", consumption: 235 }, { day: "Fri", consumption: 240 }, { day: "Sat", consumption: 225 },
        { day: "Sun", consumption: 218 }
      ],
      sectors: [
        { name: "Residential", consumption: 115, flowRate: 15.6, status: "Critical" },
        { name: "Commercial", consumption: 55, flowRate: 9.1, status: "High" },
        { name: "Industrial", consumption: 42, flowRate: 7.0, status: "Normal" },
        { name: "Parks & Ag", consumption: 28, flowRate: 5.5, status: "Critical" }
      ]
    },
    carbon: {
      offsetSources: [
        { name: "Forest Reserves", value: 70 },
        { name: "Rooftop Solar", value: 38 },
        { name: "EV Shuttles", value: 18 },
        { name: "Carbon Capture", value: 14 }
      ],
      pathwayData: [
        { year: "2022", target: 450, actual: 448 },
        { year: "2023", target: 400, actual: 392 },
        { year: "2024", target: 350, actual: 338 },
        { year: "2025", target: 300, actual: 295 },
        { year: "2026", target: 250, actual: 258 }
      ]
    },
    suggestions: [
      {
        id: "ac_curtail",
        category: "Energy",
        title: "Dynamic Smart A/C Cycling",
        description: "Increase municipal building setpoints by 1.5°C to avert grid strain.",
        savingText: "-35 MW Demand • -12 tons CO2/day",
        impact: { powerDemand: -35, carbonSaved: 12 },
        applied: false
      },
      {
        id: "ag_water_limit",
        category: "Water",
        title: "Restrict Non-Essential Park Watering",
        description: "Suspend public decorative fountains and schedule park watering to night only.",
        savingText: "+4% Reservoir Levels",
        impact: { waterLevel: 4 },
        applied: false
      }
    ]
  },

  rainstorm: {
    label: "Heavy Rainstorm",
    description: "High precipitation storm event. Peak water reserves, high wind generation, low AQI.",
    kpis: {
      aqi: 16,
      aqiStatus: "Excellent",
      powerDemand: 340,
      powerGeneration: 390,
      waterLevel: 94,
      carbonSaved: 165,
      activeLeaks: 6,
      renewablePercentage: 82,
    },
    pollution: {
      sectors: [
        { name: "Sector 1 (Industrial)", aqi: 24, status: "Good", pm25: 7, pm10: 16, no2: 10, co: 0.3 },
        { name: "Sector 2 (Commercial)", aqi: 15, status: "Good", pm25: 4, pm10: 10, no2: 6, co: 0.2 },
        { name: "Sector 3 (Residential)", aqi: 12, status: "Good", pm25: 3, pm10: 8, no2: 4, co: 0.1 },
        { name: "Sector 4 (Green Zone)", aqi: 8, status: "Good", pm25: 2, pm10: 5, no2: 2, co: 0.05 }
      ],
      trendData: [
        { time: "00:00", AQI: 40 }, { time: "04:00", AQI: 30 }, { time: "08:00", AQI: 22 },
        { time: "12:00", AQI: 16 }, { time: "16:00", AQI: 12 }, { time: "20:00", AQI: 15 }
      ]
    },
    electricity: {
      sources: [
        { name: "Solar Power", value: 30, color: "#f59e0b" },
        { name: "Wind Farms", value: 190, color: "#10b981" },
        { name: "Hydroelectric", value: 100, color: "#06b6d4" },
        { name: "Natural Gas", value: 40, color: "#6b7280" },
        { name: "Nuclear", value: 30, color: "#8b5cf6" }
      ],
      loadTrend: [
        { time: "00:00", demand: 290, generation: 340 },
        { time: "04:00", demand: 270, generation: 350 },
        { time: "08:00", demand: 320, generation: 370 },
        { time: "12:00", demand: 340, generation: 390 },
        { time: "16:00", demand: 350, generation: 400 },
        { time: "20:00", demand: 310, generation: 360 }
      ],
      zoneConsumption: [
        { name: "Residential", value: 130 },
        { name: "Commercial", value: 90 },
        { name: "Industrial", value: 90 },
        { name: "Streetlights", value: 30 }
      ]
    },
    water: {
      reservoirLevels: [
        { name: "Central Reserv.", level: 96, max: 100 },
        { name: "East Basin", level: 92, max: 100 },
        { name: "Valley Aquifer", level: 94, max: 100 }
      ],
      consumptionTrend: [
        { day: "Mon", consumption: 140 }, { day: "Tue", consumption: 142 }, { day: "Wed", consumption: 145 },
        { day: "Thu", consumption: 135 }, { day: "Fri", consumption: 128 }, { day: "Sat", consumption: 110 },
        { day: "Sun", consumption: 105 }
      ],
      sectors: [
        { name: "Residential", consumption: 60, flowRate: 9.2, status: "Normal" },
        { name: "Commercial", consumption: 32, flowRate: 5.4, status: "Normal" },
        { name: "Industrial", consumption: 30, flowRate: 4.8, status: "Optimal" },
        { name: "Parks & Ag", consumption: 3, flowRate: 0.5, status: "Shutoff" }
      ]
    },
    carbon: {
      offsetSources: [
        { name: "Forest Reserves", value: 65 },
        { name: "Rooftop Solar", value: 10 },
        { name: "Wind Grid Credit", value: 75 },
        { name: "Carbon Capture", value: 15 }
      ],
      pathwayData: [
        { year: "2022", target: 450, actual: 448 },
        { year: "2023", target: 400, actual: 392 },
        { year: "2024", target: 350, actual: 338 },
        { year: "2025", target: 300, actual: 285 },
        { year: "2026", target: 250, actual: 215 }
      ]
    },
    suggestions: [
      {
        id: "storm_divert",
        category: "Water",
        title: "Redirect Stormwater to Valley Aquifers",
        description: "Engage flood-control safety gates to recharge underground basins, avoiding river floods.",
        savingText: "+5% Aquifer Reserves",
        impact: { waterLevel: 5 },
        applied: false
      },
      {
        id: "leak_patrol",
        category: "Water",
        title: "Deploy Automated Acoustic Leak Patrols",
        description: "Use acoustic sensors in flooded zones to detect pipe fissures early.",
        savingText: "-4 Active Leaks",
        impact: { activeLeaks: -4 },
        applied: false
      }
    ]
  },

  industrial_peak: {
    label: "Industrial Peak",
    description: "Maximum industrial activity. Heavy manufacturing plants operating at 100% capacity.",
    kpis: {
      aqi: 168,
      aqiStatus: "Very Unhealthy",
      powerDemand: 520,
      powerGeneration: 530,
      waterLevel: 68,
      carbonSaved: 98,
      activeLeaks: 3,
      renewablePercentage: 45,
    },
    pollution: {
      sectors: [
        { name: "Sector 1 (Industrial)", aqi: 220, status: "Hazardous", pm25: 110, pm10: 195, no2: 95, co: 3.2 },
        { name: "Sector 2 (Commercial)", aqi: 152, status: "Unhealthy", pm25: 61, pm10: 105, no2: 52, co: 1.7 },
        { name: "Sector 3 (Residential)", aqi: 145, status: "Unhealthy", pm25: 58, pm10: 98, no2: 44, co: 1.4 },
        { name: "Sector 4 (Green Zone)", aqi: 68, status: "Moderate", pm25: 19, pm10: 42, no2: 15, co: 0.5 }
      ],
      trendData: [
        { time: "00:00", AQI: 65 }, { time: "04:00", AQI: 80 }, { time: "08:00", AQI: 142 },
        { time: "12:00", AQI: 168 }, { time: "16:00", AQI: 185 }, { time: "20:00", AQI: 150 }
      ]
    },
    electricity: {
      sources: [
        { name: "Solar Power", value: 120, color: "#f59e0b" },
        { name: "Wind Farms", value: 70, color: "#10b981" },
        { name: "Hydroelectric", value: 50, color: "#06b6d4" },
        { name: "Natural Gas", value: 210, color: "#6b7280" },
        { name: "Nuclear", value: 80, color: "#8b5cf6" }
      ],
      loadTrend: [
        { time: "00:00", demand: 320, generation: 350 },
        { time: "04:00", demand: 350, generation: 380 },
        { time: "08:00", demand: 490, generation: 500 },
        { time: "12:00", demand: 520, generation: 530 },
        { time: "16:00", demand: 550, generation: 550 },
        { time: "20:00", demand: 460, generation: 480 }
      ],
      zoneConsumption: [
        { name: "Residential", value: 110 },
        { name: "Commercial", value: 120 },
        { name: "Industrial", value: 260 },
        { name: "Streetlights", value: 30 }
      ]
    },
    water: {
      reservoirLevels: [
        { name: "Central Reserv.", level: 71, max: 100 },
        { name: "East Basin", level: 62, max: 100 },
        { name: "Valley Aquifer", level: 71, max: 100 }
      ],
      consumptionTrend: [
        { day: "Mon", consumption: 198 }, { day: "Tue", consumption: 205 }, { day: "Wed", consumption: 218 },
        { day: "Thu", consumption: 220 }, { day: "Fri", consumption: 222 }, { day: "Sat", consumption: 155 },
        { day: "Sun", consumption: 140 }
      ],
      sectors: [
        { name: "Residential", consumption: 72, flowRate: 10.4, status: "Normal" },
        { name: "Commercial", consumption: 42, flowRate: 7.2, status: "Normal" },
        { name: "Industrial", consumption: 98, flowRate: 14.8, status: "High" },
        { name: "Parks & Ag", consumption: 8, flowRate: 1.8, status: "Normal" }
      ]
    },
    carbon: {
      offsetSources: [
        { name: "Forest Reserves", value: 65 },
        { name: "Rooftop Solar", value: 15 },
        { name: "EV Shuttles", value: 18 },
        { name: "Carbon Capture", value: 45 }
      ],
      pathwayData: [
        { year: "2022", target: 450, actual: 448 },
        { year: "2023", target: 400, actual: 395 },
        { year: "2024", target: 350, actual: 345 },
        { year: "2025", target: 300, actual: 310 },
        { year: "2026", target: 250, actual: 278 }
      ]
    },
    suggestions: [
      {
        id: "emissions_scrubbers",
        category: "Pollution",
        title: "Enforce Factory Stack Scrubbing Modulators",
        description: "Deploy electrostatic precipitators on coal/gas heating vents in Sector 1.",
        savingText: "-45 AQI • +8 tons CO2/day saved",
        impact: { aqi: -45, carbonSaved: 8 },
        applied: false
      },
      {
        id: "industry_peak_load",
        category: "Energy",
        title: "Industrial Peak Load Shaving Agreement",
        description: "Contractually shift 20% of Sector 1 heavy operations to off-peak night cycles.",
        savingText: "-40 MW Peak Demand • -5 tons CO2/day",
        impact: { powerDemand: -40, carbonSaved: 5 },
        applied: false
      }
    ]
  }
};
