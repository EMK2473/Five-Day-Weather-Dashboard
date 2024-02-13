import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component with <React.StrictMode> for additional checks and warnings
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
