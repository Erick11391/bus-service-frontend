import React from "react";

const SearchSection = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  schedules,
  onSearch,
}) => {
  // Fixed routes with 20 towns
  const fixedRouteOptions = [
    "Nairobi to Mombasa", "Nairobi to Kisumu", "Nairobi to Nakuru", "Nairobi to Eldoret", "Nairobi to Thika", 
    "Nairobi to Nyeri", "Nairobi to Meru", "Nairobi to Machakos", "Nairobi to Kisii", "Nairobi to Kericho", 
    "Nairobi to Kakamega", "Nairobi to Bungoma", "Nairobi to Malindi", "Nairobi to Kitui", "Nairobi to Garissa", 
    "Nairobi to Nyahururu", "Nairobi to Narok", "Nairobi to Voi", "Nairobi to Isiolo", 
    "Mombasa to Nairobi", "Kisumu to Nairobi", "Nakuru to Nairobi", "Eldoret to Nairobi", "Thika to Nairobi", 
    "Nyeri to Nairobi", "Meru to Nairobi", "Machakos to Nairobi", "Kisii to Nairobi", "Kericho to Nairobi", 
    "Kakamega to Nairobi", "Bungoma to Nairobi", "Malindi to Nairobi", "Kitui to Nairobi", "Garissa to Nairobi", 
    "Nyahururu to Nairobi", "Narok to Nairobi", "Voi to Nairobi", "Isiolo to Nairobi"
  ];

  // Extract and sort unique departure and destination options from fixed routes
  const departureOptions = Array.from(
    new Set(
      fixedRouteOptions
        .map((route) => route.split(" to ")[0]?.trim())
        .filter(Boolean)
    )
  ).sort();

  const destinationOptions = Array.from(
    new Set(
      fixedRouteOptions
        .map((route) => route.split(" to ")[1]?.trim())
        .filter(Boolean)
    )
  ).sort();

  return (
    <div className="search-box">
      {/* Departure Dropdown */}
      <select
        className="search-input"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        required
      >
        <option value="">🚌 Departure</option>
        {departureOptions.map((dep, index) => (
          <option key={index} value={dep}>
            {dep}
          </option>
        ))}
      </select>

      {/* Destination Dropdown */}
      <select
        className="search-input"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      >
        <option value="">🚌 Destination</option>
        {destinationOptions.map((dest, index) => (
          <option key={index} value={dest}>
            {dest}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        className="search-btn"
        onClick={onSearch}
        disabled={!departure || !destination || departure === destination}
        title={
          departure === destination && departure
            ? "Departure and destination can't be the same"
            : "Click to search schedules"
        }
      >
        🚌 Search
      </button>
    </div>
  );
};

export default SearchSection;
