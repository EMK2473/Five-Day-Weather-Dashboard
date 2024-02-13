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
        backgroundColor: "#4A555F"
      }}
    >
      <div>
      <h2 style={{ color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white" }}>{city}</h2>
        <p>Temperature: <span style={{ color: "#F4CB5C" }}>{weatherData.main.temp}°C</span></p>
        <p>Wind: <span style={{ color: "#F4CB5C" }}>{weatherData.wind.speed} m/s</span></p>
        <p>Humidity: <span style={{ color: "#F4CB5C" }}>{weatherData.main.humidity}%</span></p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
      <div style={{marginTop: "25px", marginRight: "300px"}}>
        <p>Pressure: <span style={{ color: "#F4CB5C" }}>{weatherData.main.pressure} hPa</span></p>
        <p>Visibility: <span style={{ color: "#F4CB5C" }}>{weatherData.visibility} meters</span></p>
        <p>Sunrise: <span style={{ color: "#F4CB5C" }}>{sunriseTime}</span></p>
        <p>Sunset: <span style={{ color: "#F4CB5C" }}>{sunsetTime}</span></p>
      </div>
    </div>
  );
}

export default WeatherGrid;
