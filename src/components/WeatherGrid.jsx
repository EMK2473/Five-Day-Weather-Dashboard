// WeatherGrid.jsx

import React from 'react';

function WeatherGrid({ city }) {
  // Placeholder values for temperature, wind, and humidity
  const temperature = '25°C';
  const wind = '10 mph';
  const humidity = '60%';

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>{city} ☀️</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr style={{ borderTop: '1px solid #fff' }}>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>Temperature:</td>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>{temperature}</td>
          </tr>
          <tr style={{ borderTop: '1px solid #fff' }}>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>Wind:</td>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>{wind}</td>
          </tr>
          <tr style={{ borderTop: '1px solid #fff' }}>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>Humidity:</td>
            <td style={{ borderTop: '1px solid #fff', padding: '5px 0' }}>{humidity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeatherGrid;
