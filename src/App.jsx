// App.js

import { useState } from 'react';
import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm'; 
import WeatherGrid from './components/WeatherGrid'; // Import WeatherGrid component

function App() {
  const [count, setCount] = useState(0);

  // Placeholder city object with dummy weather information
  const placeholderCity = {
    city: 'New York',
    temperature: '25°C',
    wind: '10 mph',
    humidity: '60%'
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Five Day Weather Forecast</h1>
      </header>
      <div className="container">
        <aside className="aside">
          {/* Add the SearchForm component here */}
          <SearchForm />
        </aside>
        <div>
          <div className="body-container">
            <main className="main">
              {/* Render the WeatherGrid component with placeholder city data */}
              <WeatherGrid city={placeholderCity.city} />
            </main>
          </div>
          <div className="body-container">
            <main className="main">
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
