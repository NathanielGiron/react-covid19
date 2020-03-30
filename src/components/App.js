import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './NavBar';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <Dashboard />
      </div>
    </div>

  );
}

export default App;
