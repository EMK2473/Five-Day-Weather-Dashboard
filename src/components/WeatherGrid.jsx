// WeatherGrid.jsx

import React, { useState, useEffect } from 'react';

function WeatherGrid({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
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
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>{city} </h2>
      <div>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
    </div>
  );
}

export default WeatherGrid;
