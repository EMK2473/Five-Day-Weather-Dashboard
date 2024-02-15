import React, { useState, useEffect } from "react";

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const [searchSuccess, setSearchSuccess] = useState(true);

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(storedCities);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSearch(searchTerm);
      if (response.ok) {
        const updatedCities = [searchTerm, ...recentCities.filter(city => city !== searchTerm).slice(0, 4)];
        setRecentCities(updatedCities);
        localStorage.setItem("recentCities", JSON.stringify(updatedCities));
        setSearchSuccess(true);
      } else {
        setSearchSuccess(false);
      }
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setSearchSuccess(false);
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
          padding: "10px"
        }}
      >
        {/* Search form */}
        <form
          style={{ display: "flex", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{ marginRight: "10px", padding: "8px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#4A555F",
              color: "#F4CB5C",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </div>
      {!searchSuccess && (
        <p style={{ color: "red", textAlign: "center" }}>
          Search unsuccessful. Please try again.
        </p>
      )}
      {/* Display list of previously viewed cities */}
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
