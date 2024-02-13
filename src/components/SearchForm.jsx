import React, { useState } from "react";

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentCities, setRecentCities] = useState(
    JSON.parse(localStorage.getItem("recentCities")) || []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSearch(searchTerm);
      const updatedCities = [searchTerm, ...recentCities.slice(0, 4)];
      setRecentCities(updatedCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          padding: "10px", // Added padding to the search bar
        }}
      >
        <form
          style={{ display: "flex", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{ marginRight: "10px", padding: "8px" }} // Added padding to the search bar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px", // Added padding to the search button
              backgroundColor: "#4A555F",
              color: "#F4CB5C", // Added color property
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <h2 style={{ textAlign: "center" }}>Previously Viewed Cities</h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}
        >
          {recentCities.map((city, index) => (
            <button
              key={index}
              onClick={() => onSearch(city)}
              style={{
                backgroundColor: "#4A555F",
                color: "#F4CB5C",
                padding: "8px", 
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
