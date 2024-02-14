// Import React hooks
import React, { useState, useEffect } from "react";

// WeatherGrid component to display weather data for a specific city
function WeatherGrid({ city, onSuccessfulSearch }) {
  // State variable to store weather data fetched from the API
  const [weatherData, setWeatherData] = useState(null);

  // Effect hook to fetch weather data when the city prop changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`
        );
        // Parse the response as JSON
        const data = await response.json();
        // Update the weather data state with the fetched data
        setWeatherData(data);
        // If the fetch is successful, trigger the onSuccessfulSearch callback
        if (response.ok) {
          onSuccessfulSearch(city); 
        }
      } catch (error) {
        // Log any errors that occur during fetching
        console.error("Error fetching weather data:", error);
      }
    };

    // Fetch weather data only if a city is provided
    if (city) {
      fetchWeatherData();
    }
  }, [city, onSuccessfulSearch]);

  // Effect hook to update recent cities in local storage when weather data is fetched
  useEffect(() => {
    if (weatherData) {
      // Retrieve recent cities from local storage
      const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
      // Update recent cities list with the current city
      const updatedCities = [city, ...recentCities.filter(item => item !== city).slice(0, 4)];
      // Store the updated recent cities list in local storage
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    }
  }, [city, weatherData]);

  // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  // Render loading message if weather data is not yet available
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Extract sunrise and sunset times from weather data
  const sunriseTime = weatherData.sys.sunrise
    ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US")
    : "N/A";
  const sunsetTime = weatherData.sys.sunset
    ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US")
    : "N/A";

  // Render weather data for the city
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
        {/* Display city name */}
        <h2 style={{ color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white" }}>
          {city}
        </h2>
        {/* Display temperature in Fahrenheit */}
        <p>
          Temperature: <span style={{ color: "#F4CB5C" }}>{celsiusToFahrenheit(weatherData.main.temp)}°F</span>
        </p>
        {/* Display other weather data */}
        <p>
          Wind: <span style={{ color: "#F4CB5C" }}>{weatherData.wind.speed} m/s</span>
        </p>
        <p>
          Humidity: <span style={{ color: "#F4CB5C" }}>{weatherData.main.humidity}%</span>
        </p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
      </div>
      <div style={{ marginTop: "25px", marginRight: "300px" }}>
        {/* Display other weather data */}
        <p>
          Pressure: <span style={{ color: "#F4CB5C" }}>{weatherData.main.pressure} hPa</span>
        </p>
        <p>
          Visibility: <span style={{ color: "#F4CB5C" }}>{weatherData.visibility} meters</span>
        </p>
        <p>
          Sunrise: <span style={{ color: "#F4CB5C" }}>{sunriseTime}</span>
        </p>
        <p>
          Sunset: <span style={{ color: "#F4CB5C" }}>{sunsetTime}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherGrid;
