import React, { useState, useEffect } from 'react';

function CityWeatherTables({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
        const data = await response.json();
        const dailyData = data.list.filter((forecast, index) => index % 8 === 0); 
        setWeatherData(dailyData);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const celsiusToFahrenheit = (celsius) => {
    return ((celsius * 9/5) + 32).toFixed(2);
  };

  return (
    <div className="weather-container">
      {/* Title displaying the city's 5-day forecast */}
      <div className="forecast-title" style={{ color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white" }}>{city}'s 5-Day Forecast</div>
      <div className="city-weather-tables">
        <ul className="forecast-list">
          {weatherData.map((forecast, idx) => (
            <li key={idx} className="forecast-item">
              <div className="city-container" style={{backgroundColor: "#4A555F"}}>
                <h3>Date: <span style={{ color: '#F4CB5C' }}>{formatDate(forecast.dt_txt)}</span></h3>
                <p>Temp: <span style={{ color: '#F4CB5C' }}>{celsiusToFahrenheit(forecast.main.temp)}°F</span></p>
                <p>Wind: <span style={{ color: '#F4CB5C' }}>{forecast.wind.speed} m/s</span></p>
                <p>Humidity: <span style={{ color: '#F4CB5C' }}>{forecast.main.humidity}%</span></p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CityWeatherTables;
