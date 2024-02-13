// App.js

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

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  return (
    <div>
      <header className="header" style={{backgroundColor: "#4A555F", color: "#F4CB5C", textDecoration: "underline", textDecorationColor: "white"}}>
        <h1 style={{color: "#F4CB5C"}} className="title">Five Day Weather Forecast</h1>
      </header>
      <div className="container">
        <aside className="aside">
          <SearchForm onSearch={handleSearch} />
        </aside>
        <div>
          <div className="body-container">
            <main className="main">
              {searchedCity && <WeatherGrid city={searchedCity} />}
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
