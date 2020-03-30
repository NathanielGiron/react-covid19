import React from 'react';

const State = ({ state, cases, new_cases, deaths, new_deaths }) => ( 
  <tr>
    <td><strong>{state}</strong></td>
    <td className="text-danger"><small className="d-block d-sm-none">{new_cases}</small>{cases}</td>
    <td className="text-muted d-none d-sm-table-cell">{new_cases}</td>
    <td><small className="d-block d-sm-none">{new_deaths}</small>{deaths}</td>
    <td className="text-muted d-none d-sm-table-cell">{new_deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ deaths ? (parseInt(deaths.split(",").join("")) / parseInt(cases.split(",").join("")) * 100).toFixed(1) + '%' : '' }</td>
  </tr>
);

export default State;