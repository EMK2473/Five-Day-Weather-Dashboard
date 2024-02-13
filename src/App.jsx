// Import necessary hooks and components
import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm'; 
import WeatherGrid from './components/WeatherGrid';
import CityWeatherTables from './components/CityWeatherTables';

// Main App component
function App() {
  // State variable to store the city being searched for
  const [searchedCity, setSearchedCity] = useState(null);

  // useEffect hook to set the initial searched city based on recent searches stored in local storage
  useEffect(() => {
    // Retrieve recent cities from local storage
    const recentCities = JSON.parse(localStorage.getItem("recentCities"));
    // Set the searched city to the most recent city if available
    if (recentCities && recentCities.length > 0) {
      setSearchedCity(recentCities[0]);
    }
  }, []);

  // Function to handle city search
  const handleSearch = async (city) => {
    // Fetch weather data for the specified city from the OpenWeatherMap API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
    // If the fetch is successful, update the searched city state
    if (response.ok) {
      setSearchedCity(city);
    }
    // Return the response from the API fetch
    return response;
  };

  // Function to handle actions upon successful search
  const handleSuccessfulSearch = (city) => {
    // Log a message indicating that weather data for the city was successfully fetched
    console.log(`Successfully fetched weather data for ${city}`);
  };

  // Render the application layout
  return (
    <div>
      {/* Header section */}
      <header className="header" style={{backgroundColor: "#4A555F", color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white"}}>
        <h1 style={{color: "#F4CB5C"}} className="title">Five Day Weather Forecast</h1>
      </header>
      <div className="container">
        {/* Sidebar containing the search form */}
        <aside className="aside">
          <SearchForm onSearch={handleSearch} />
        </aside>
        {/* Main section containing weather information */}
        <div>
          <div className="body-container">
            <main className="main">
              {searchedCity && <WeatherGrid city={searchedCity} onSuccessfulSearch={handleSuccessfulSearch} />}
            </main>
          </div>
          <div className="body-container">

            <main className="main">
              {searchedCity && <CityWeatherTables city={searchedCity} />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
