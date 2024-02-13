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

  // Helper function to format date into Month/Day/Year format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Filter out one forecast per day for the next 5 days
  const filteredForecasts = weatherData.list.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  const forecastsArray = Object.values(filteredForecasts).slice(0, 5);

  return (
    <div className="city-weather-tables">
      <ul className="forecast-list">
        {forecastsArray.map((forecast, idx) => (
          <li key={idx} className="forecast-item">
            <div>
              <h3>Date: {formatDate(forecast.dt_txt)}</h3>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Wind: {forecast.wind.speed} m/s</p>
              <p>Humidity: {forecast.main.humidity}%</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityWeatherTables;
