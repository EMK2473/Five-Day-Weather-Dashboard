// Import React hooks
import React, { useState, useEffect } from 'react';

// This component fetches and displays the 5-day weather forecast for a given city
function CityWeatherTables({ city }) {
  // State variable to store the weather data fetched from the API
  const [weatherData, setWeatherData] = useState(null);

  // Effect hook to fetch weather data when the city prop changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from OpenWeatherMap API for 5 days with 3-hour interval
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
        // Parse the response as JSON
        const data = await response.json();
        // Filter the data to get only one data point per day
        const dailyData = data.list.filter((forecast, index) => index % 8 === 0); // Selecting every 8th element to get data for every day
        // Update the weather data state with the fetched data
        setWeatherData(dailyData);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching weather data:', error);
      }
    };

    // Fetch weather data only if a city is provided
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  // Render loading message if weather data is not yet available
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Helper function to format date into Month/Day/Year format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  // Render weather data once available
  return (
    <div className="weather-container">
      {/* Title displaying the city's 5-day forecast */}
      <div className="forecast-title" style={{ color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white" }}>{city}'s 5-Day Forecast</div>
      <div className="city-weather-tables">
        <ul className="forecast-list">
          {/* Map through the 5-day forecast data and render each */}
          {weatherData.map((forecast, idx) => (
            <li key={idx} className="forecast-item">
              <div className="city-container" style={{backgroundColor: "#4A555F"}}>
                {/* Display forecast date */}
                <h3>Date: <span style={{ color: '#F4CB5C' }}>{formatDate(forecast.dt_txt)}</span></h3>
                {/* Display forecast temperature in Celsius and Fahrenheit */}
                <p>Temp: <span style={{ color: '#F4CB5C' }}>{celsiusToFahrenheit(forecast.main.temp)}°F</span></p>
                {/* Display forecast wind speed */}
                <p>Wind: <span style={{ color: '#F4CB5C' }}>{forecast.wind.speed} m/s</span></p>
                {/* Display forecast humidity */}
                <p>Humidity: <span style={{ color: '#F4CB5C' }}>{forecast.main.humidity}%</span></p>
                {/* Display weather icon */}
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
