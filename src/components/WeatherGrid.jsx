import React, { useState, useEffect } from "react";

function WeatherGrid({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
    "en-US"
  );
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    "en-US"
  );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>{city}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
      <div style={{marginTop: "25px", marginRight: "300px"}}>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Visibility: {weatherData.visibility} meters</p>
        <p>Sunrise: {sunriseTime}</p>
        <p>Sunset: {sunsetTime}</p>
      </div>
    </div>
  );
}

export default WeatherGrid;
