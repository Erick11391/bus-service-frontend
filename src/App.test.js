// src/App.js
import React, { useState } from 'react';
import BusList from './components/BusList';
import AddBusForm from './components/AddBusForm';
import EditBusForm from './components/EditBusForm';
import SearchBar from './components/SearchBar';
import DeleteButton from './components/DeleteButton';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // For routing

function App() {
  const [schedules, setSchedules] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch bus schedules from backend
  const fetchSchedules = () => {
    fetch('http://127.0.0.1:5000/schedules')
      .then(response => response.json())
      .then(data => setSchedules(data.data))
      .catch(error => console.error('Error fetching schedules:', error));
  };

  const handleDelete = (busId) => {
    setSchedules(schedules.filter(schedule => schedule.bus_id !== busId));  // Remove deleted schedule from state
  };

  const handleSearch = (query) => {
    fetch(`http://127.0.0.1:5000/search?query=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error searching schedules:', error));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <h1>Bus Service System</h1>
            <SearchBar onSearch={handleSearch} />
            <BusList schedules={searchResults.length ? searchResults : schedules} />
          </Route>
          <Route path="/add">
            <AddBusForm />
          </Route>
          <Route path="/edit/:busId">
            <EditBusForm fetchSchedules={fetchSchedules} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
