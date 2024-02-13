// App.js

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import SearchForm from '../src/components/SearchForm.jsx'; 

function App() {
  const [count, setCount] = useState(0);

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
              {/* Content for the first body container */}
            </main>
          </div>
          <div className="body-container">
            <main className="main">
              {/* Content for the second body container */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
