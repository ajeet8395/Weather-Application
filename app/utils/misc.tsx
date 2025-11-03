import moment from "moment";

// kelvin to celsius convertor
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

// Time
export const unixToTime = (unix: number, timezone: number) => {
  return moment.unix(unix).utcOffset(timezone / 60).format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

// Calculate AQI from PM2.5 concentration (µg/m³) using US EPA formula
export const calculateAQIFromPM25 = (pm25: number): number => {
  // PM2.5 breakpoints and corresponding AQI values (US EPA)
  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, aqiLow: 0, aqiHigh: 50 },      // Good
    { cLow: 12.1, cHigh: 35.4, aqiLow: 51, aqiHigh: 100 },   // Moderate
    { cLow: 35.5, cHigh: 55.4, aqiLow: 101, aqiHigh: 150 },  // Unhealthy for Sensitive Groups
    { cLow: 55.5, cHigh: 150.4, aqiLow: 151, aqiHigh: 200 }, // Unhealthy
    { cLow: 150.5, cHigh: 250.4, aqiLow: 201, aqiHigh: 300 },// Very Unhealthy
    { cLow: 250.5, cHigh: 500.4, aqiLow: 301, aqiHigh: 500 } // Hazardous
  ];

  // Find the appropriate breakpoint
  for (const bp of breakpoints) {
    if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
      // AQI formula: ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low
      const aqi = Math.round(
        ((bp.aqiHigh - bp.aqiLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.aqiLow
      );
      return aqi;
    }
  }

  // If PM2.5 exceeds 500.4, return max hazardous
  return pm25 > 500.4 ? 500 : 0;
};

// Get AQI description and category based on AQI value
export const getAQIDescription = (aqi: number): { description: string; category: string } => {
  if (aqi <= 50) return { description: "good", category: "Good" };
  if (aqi <= 100) return { description: "moderate", category: "Moderate" };
  if (aqi <= 150) return { description: "unhealthy for sensitive groups", category: "Unhealthy for Sensitive Groups" };
  if (aqi <= 200) return { description: "unhealthy", category: "Unhealthy" };
  if (aqi <= 300) return { description: "very unhealthy", category: "Very Unhealthy" };
  return { description: "hazardous", category: "Hazardous" };
};

// Air Quality Index (legacy - kept for backward compatibility)
export const airQulaityIndexText = [
  {
    rating: 10,
    description: "excellent",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 30,
    description: "satisfactory",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 50,
    description: "moderate",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 70,
    description: "poor",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 90,
    description: "very poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];
