// App.js

import { useState } from 'react';
import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm'; 
import WeatherGrid from './components/WeatherGrid';
import CityWeatherTables from './components/CityWeatherTables';

function App() {
  const [searchedCity, setSearchedCity] = useState(null);

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Five Day Weather Forecast</h1>
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
              <CityWeatherTables city={searchedCity} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
