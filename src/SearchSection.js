import React from "react";

const SearchSection = ({ departure, setDeparture, destination, setDestination, schedules, onSearch }) => {
  // Extract unique departure and destination options from the schedules
  const departureOptions = [...new Set(schedules.map(schedule => schedule.route.split(" to ")[0]))];
  const destinationOptions = [...new Set(schedules.map(schedule => schedule.route.split(" to ")[1]))];

  return (
    <div className="search-box">
      {/* Departure Dropdown */}
      <select
        className="search-input"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        required
      >
        <option value="">Select Departure</option>
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
        <option value="">Select Destination</option>
        {destinationOptions.map((dest, index) => (
          <option key={index} value={dest}>
            {dest}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchSection;
