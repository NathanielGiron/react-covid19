import React from 'react';

const MapDetails = ({ cases_location, total_cases, total_recovered, total_deaths, active_cases, new_cases, new_deaths }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <strong>{cases_location}</strong><br /><br />
      <strong>Confirmed Cases:</strong> <h4 className="text-danger">{total_cases.toLocaleString()}</h4>
      <strong>Active Cases:</strong> <span className="text-primary">{active_cases.toLocaleString()}</span> <br />
      <strong>Recovered Cases:</strong> <span className="text-success">{total_recovered.toLocaleString()}</span> <br />
      <strong>Fatal Cases:</strong> {total_deaths.toLocaleString()} <br />

    </div>
  </div>
);

export default MapDetails;