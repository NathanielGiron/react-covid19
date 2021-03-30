import React from 'react';

const State = ({ state, cases, new_cases, deaths, new_deaths, tests, TotCases_1M_Pop }) => ( 
  <tr>
    <td>{state}</td>
    <td className="text-danger"><small className="text-info d-block d-sm-none">{new_cases}</small>{cases}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{new_cases}</td>
    <td><small className="text-info d-block d-sm-none">{new_deaths}</small>{deaths}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{new_deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ deaths ? (parseInt(deaths.split(",").join("")) / parseInt(cases.split(",").join("")) * 100).toFixed(1) + '%' : '' }</td>
    <td className="d-none d-sm-table-cell"><small>{TotCases_1M_Pop ? parseInt((1000000 / parseFloat(TotCases_1M_Pop.split(",").join(""))) * parseFloat(cases.split(",").join(""))).toLocaleString() : ""}</small></td>
  </tr>
);

export default State;