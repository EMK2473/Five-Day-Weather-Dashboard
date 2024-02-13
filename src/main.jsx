// Import necessary modules from React and ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the main App component
import App from './App.jsx'

// Import styles for the application
import './index.css'

// Render the App component using ReactDOM.createRoot()
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component with <React.StrictMode> for additional checks and warnings
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
