# 🌦️ Modern Weather Dashboard

A sleek, dark-themed **Weather Dashboard Application** built with **Next.js**, **Tailwind CSS**, and **OpenWeather API**.  
It displays **real-time weather updates**, **air quality**, **UV index**, and **5-day forecasts** for any city in a modern and interactive interface.

---

## 📸 Preview

![Weather Dashboard Preview](./public/weatherM.png)

---

## 🌍 Features

- 🌡️ **Real-Time Temperature** with hourly updates  
- 🌤️ **5-Day Forecast** for upcoming weather trends  
- 🏙️ **City Search** – Get weather data for any location  
- 💨 **Wind Speed & Direction Compass**  
- ☁️ **Air Quality Index (AQI)** and **PM2.5** levels  
- 🌇 **Sunrise & Sunset Timings**  
- 🌞 **UV Index** Indicator  
- 💧 **Humidity, Pressure, and Visibility Data**  
- 📊 **Feels Like Temperature**  
- 📱 **Responsive Design** for all screen sizes  
- ⚡ **Fast and minimal UI** built with **Next.js + Tailwind CSS**

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js** | Framework for React-based UI |
| **Tailwind CSS** | Styling and layout |
| **OpenWeather API** | Weather & pollution data |
| **Framer Motion** | Smooth animations |
| **JavaScript (ES6+)** | Logic and interactivity |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ajeet8395/Weather-Application.git
cd weather-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env.local File
Add your OpenWeather API Key:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Now open http://localhost:3000 in your browser 🌐

⚙️ API Used
OpenWeather API – for real-time weather, air pollution, and forecast data.

📁 Folder Structure
pgsql
Copy code
weather-app/
├── components/
│   ├── WeatherCard.jsx
│   ├── ForecastCard.jsx
│   └── AirQuality.jsx
├── pages/
│   ├── index.tsx
│   └── api/
├── public/
│   └── icons/
├── styles/
│   └── globals.css
└── .env.local
🧾 License
This project is licensed under the MIT License – you’re free to use, modify, and distribute it.

💖 Acknowledgements
OpenWeather

Tailwind CSS

Next.js

👨‍💻 Author
Ajeet Singh
🌐 Portfolio
💼 LinkedIn