"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermo } from "@/app/utils/Icons";
import { calculateAQIFromPM25, getAQIDescription } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  // check if airQuality is available, check if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].components
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  // Get AQI from the API response (1-5 scale)
  const aqiIndex = airQuality.list[0].main.aqi;
  const pm25 = airQuality.list[0].components.pm2_5;
  
  // Map OpenWeather's 1-5 scale to AQI ranges
  let aqi: number;
  let aqiInfo: { description: string; category: string };
  
  switch(aqiIndex) {
    case 1: // Good (0-50)
      aqi = 25;
      aqiInfo = { description: 'Good', category: 'Good' };
      break;
    case 2: // Moderate (51-100)
      aqi = 75;
      aqiInfo = { description: 'Moderate', category: 'Moderate' };
      break;
    case 3: // Poor (101-150)
      aqi = 125;
      aqiInfo = { description: 'Poor', category: 'Unhealthy for Sensitive Groups' };
      break;
    case 4: // Unhealthy (151-200)
      aqi = 255;
      aqiInfo = { description: 'Unhealthy', category: 'Unhealthy' };
      break;
    case 5: // Hazardous (200+)
      // For Hazardous, we'll use the PM2.5 value to estimate a more precise AQI
      if (pm25 <= 150.4) {
        aqi = 200 + (pm25 - 55.5) * (300 - 200) / (150.4 - 55.5);
      } else {
        aqi = 300 + (pm25 - 150.5) * (500 - 300) / (500.4 - 150.5);
      }
      aqi = Math.min(Math.round(aqi), 500);
      aqiInfo = { 
        description: 'Hazardous', 
        category: aqi >= 300 ? 'Hazardous' : 'Very Unhealthy' 
      };
      break;
    default:
      aqi = 0;
      aqiInfo = { description: 'Unknown', category: 'Unknown' };
  }
  
  // Calculate progress bar value (0-100 scale, capped at 500 AQI)
  const progressValue = Math.min((aqi / 500) * 100, 100);

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-4
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 hover:border-green-300 duration-300 cursor-pointer"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={progressValue} max={100} className="progress" />
      <p className="text-sm">Air quality is {aqiInfo.description}. </p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">AQI: <span className="font-semibold text-foreground">{Math.round(aqi)}</span> <span className="text-xs">({aqiInfo.category})</span></span>
        <span className="text-muted-foreground">PM2.5: <span className="font-semibold text-foreground">{pm25.toFixed(1)} µg/m³</span></span>
      </div>
    </div>
  );
}

export default AirPollution;
