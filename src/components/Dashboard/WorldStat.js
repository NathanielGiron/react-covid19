import React from 'react';

const WorldStat = ({ total_cases, total_recovered, total_deaths, new_cases, new_deaths, last_updated }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <strong>Total Confirmed Cases:</strong> <h4 className="text-danger">{total_cases}</h4>
      <strong>Active Cases:</strong> <span className="text-primary">{(parseInt((total_cases.split(",").join(""))) - (parseInt((total_recovered).split(",").join("")) + parseInt((total_deaths).split(",").join("")))).toLocaleString()}</span> <br />
      <strong>Recovered Cases:</strong> <span className="text-success">{total_recovered}</span> <br />
      <strong>Fatal Cases:</strong> {total_deaths} <br />
      <br />
      <strong>New Cases:</strong> {new_cases} <br />
      <strong>New Deaths:</strong> {new_deaths}

      <br /><br />
      <small>Last Updated: <br></br> {last_updated} GMT </small>
    </div>
  </div>
);

export default WorldStat;