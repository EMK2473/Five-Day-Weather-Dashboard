// SearchForm.js

import React from "react";

function SearchForm() {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <form style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{ marginRight: "10px" }}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <h2 style={{ textAlign: "center" }}>Previously Viewed Cities</h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}
        >
          {cities.map((city, index) => (
            <button key={index}>{city}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
