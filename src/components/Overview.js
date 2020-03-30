import React from 'react';

const WorldStat = ({ cases_type, total_cases, total_recovered, total_deaths, active_cases, new_cases, new_deaths }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <strong>{cases_type} Confirmed Cases:</strong> <h4 className="text-danger">{total_cases.toLocaleString()}</h4>
      <strong>Active Cases:</strong> <span className="text-primary">{active_cases.toLocaleString()}</span> <br />
      <strong>Recovered Cases:</strong> <span className="text-success">{total_recovered.toLocaleString()}</span> <br />
      <strong>Fatal Cases:</strong> {total_deaths.toLocaleString()} <br />
      <br />
      <strong>New Cases:</strong> {new_cases} <br />
      <strong>New Deaths:</strong> {new_deaths}

      <br /><br />
      <small>Last Updated: <br></br> A few seconds ago. </small>
    </div>
  </div>
);

export default WorldStat;