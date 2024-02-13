// Import React hooks
import React, { useState, useEffect } from "react";

// SearchForm component for handling city search and displaying recent searches
function SearchForm({ onSearch }) {
  // State variables for search term, recent cities, and search success status
  const [searchTerm, setSearchTerm] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const [searchSuccess, setSearchSuccess] = useState(true);

  // useEffect hook to load recent cities from local storage on component mount
  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(storedCities);
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform city search using the provided onSearch function
      const response = await onSearch(searchTerm);
      // If search is successful, update recent cities list and store it in local storage
      if (response.ok) {
        const updatedCities = [searchTerm, ...recentCities.filter(city => city !== searchTerm).slice(0, 4)];
        setRecentCities(updatedCities);
        localStorage.setItem("recentCities", JSON.stringify(updatedCities));
        setSearchSuccess(true);
      } else {
        // If search is unsuccessful, set search success status to false
        setSearchSuccess(false);
      }
      // Clear search term input field after submission
      setSearchTerm("");
    } catch (error) {
      // Log error if fetching weather data fails
      console.error("Error fetching weather data:", error);
      // Set search success status to false
      setSearchSuccess(false);
    }
  };

  // Render search form and recent cities list
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
      {/* Display error message if search is unsuccessful */}
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
