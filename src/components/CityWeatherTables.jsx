// CityWeatherTables.jsx

import React, { useState, useEffect } from 'react';

function CityWeatherTables({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="city-weather-tables">
      <h2>{city}</h2>
      <ul>
        {weatherData.list && weatherData.list.map((forecast, idx) => (
          <li key={idx}>
            <h3>Date: {forecast.dt_txt}</h3>
            <p>Temperature: {forecast.main.temp}°C</p>
            <p>Wind: {forecast.wind.speed} m/s</p>
            <p>Humidity: {forecast.main.humidity}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityWeatherTables;
