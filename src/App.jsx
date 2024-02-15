import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm'; 
import WeatherGrid from './components/WeatherGrid';
import CityWeatherTables from './components/CityWeatherTables';


function App() {

  const [searchedCity, setSearchedCity] = useState(null);

  useEffect(() => {
    const recentCities = JSON.parse(localStorage.getItem("recentCities"));
    if (recentCities && recentCities.length > 0) {
      setSearchedCity(recentCities[0]);
    }
  }, []);


  const handleSearch = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e27d7859898089c77e02a338285d98b&units=metric`);
    if (response.ok) {
      setSearchedCity(city);
    }
    return response;
  };


  const handleSuccessfulSearch = (city) => {
    console.log(`Successfully fetched weather data for ${city}`);
  };


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
