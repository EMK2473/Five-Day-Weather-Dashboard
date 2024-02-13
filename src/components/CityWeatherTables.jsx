// CityWeatherTables.jsx

import React, { useState, useEffect } from 'react';

function CityWeatherTables({ cities }) {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=imperial`);
        const data = await response.json();
        setWeatherData((prevData) => [...prevData, { city, data }]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    cities.forEach(city => {
      fetchWeatherData(city.name);
    });
  }, [cities]);

  return (
    <div className="city-weather-tables">
      {weatherData.map(({ city, data }, index) => (
        <div key={index} className="city-container">
          <h2>{city}</h2>
          <ul style={{ listStyleType: 'none' }}> 
            {data.list && data.list.slice(0, 5).map((forecast, idx) => (
              <li key={idx}>
                <strong>Date:</strong> {forecast.dt_txt}<br />
                <strong>Temp:</strong> {forecast.main.temp}°F<br />
                <strong>Wind:</strong> {forecast.wind.speed} mph<br />
                <strong>Humidity:</strong> {forecast.main.humidity}%
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CityWeatherTables;
