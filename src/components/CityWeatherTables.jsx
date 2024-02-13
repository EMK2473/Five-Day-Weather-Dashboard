// CityWeatherTables.jsx

import React from 'react';

function CityWeatherTables({ cities }) {
  return (
    <div className="city-weather-tables">
      {cities.map((city, index) => (
        <div key={index} className="city-container">
          <h2>{city.name}</h2>
          <ul style={{ listStyleType: 'none' }}> 
            <li><strong>Date:</strong> {city.date}</li>
            <li><strong>Temp:</strong> {city.temperature}</li>
            <li><strong>Wind:</strong> {city.wind}</li>
            <li><strong>Humidity:</strong> {city.humidity}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CityWeatherTables;
