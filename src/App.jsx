// App.js

import { useState } from 'react';
import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm'; 
import WeatherGrid from './components/WeatherGrid';
import CityWeatherTables from './components/CityWeatherTables'; // Import CityWeatherTables component

function App() {
  const [count, setCount] = useState(0);

  // Placeholder cities
  const cities = [
    { name: 'New York' },
    { name: 'Los Angeles' },
    { name: 'Chicago' },
    { name: 'Houston' },
    { name: 'Phoenix' }
  ];

  return (
    <div>
      <header className="header">
        <h1 className="title">Five Day Weather Forecast</h1>
      </header>
      <div className="container">
        <aside className="aside">
          <SearchForm />
        </aside>
        <div>
          <div className="body-container">
            <main className="main">
              <WeatherGrid city="New York" />
            </main>
          </div>
          <div className="body-container">
            <main className="main">
              <CityWeatherTables cities={cities} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
