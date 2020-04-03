import React from 'react';

const State = ({ state, cases, new_cases, deaths, new_deaths }) => ( 
  <tr>
    <td>{state}</td>
    <td className="text-danger"><small className="text-info d-block d-sm-none">{state === 'Total:' ? '+' : ''}{new_cases}</small>{cases}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{state === 'Total:' ? '+' : ''}{new_cases}</td>
    <td><small className="text-info d-block d-sm-none">{state === 'Total:' ? '+' : ''}{new_deaths}</small>{deaths}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{state === 'Total:' ? '+' : ''}{new_deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ deaths ? (parseInt(deaths.split(",").join("")) / parseInt(cases.split(",").join("")) * 100).toFixed(1) + '%' : '' }</td>
  </tr>
);

export default State;