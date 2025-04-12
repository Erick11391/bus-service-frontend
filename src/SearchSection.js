import React from "react";


const SearchSection = ({ departure, setDeparture, destination, setDestination, onSearch }) => {
  return (
    <div className="search-box">
      {/* Departure Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Departure"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        required
      />

      {/* Destination Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />

      {/* Search Button */}
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchSection;