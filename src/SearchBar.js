import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger the search functionality
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search bus schedules by route or time..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
