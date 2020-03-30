import React from 'react';

const Country = ({ country, cases, new_cases, deaths, new_deaths, recovered, critical}) => ( 
  <tr>
    <td><strong>{country}</strong></td>
    <td className="text-danger">{cases}</td>
    <td className="text-muted d-none d-sm-table-cell">{new_cases === '0' ? '' : '+' + new_cases}</td>
    <td>{deaths}</td>
    <td className="text-muted d-none d-sm-table-cell">{new_deaths === '0' ? '' : '+' + new_deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ (parseFloat(deaths.split(",").join("")) / parseFloat(cases.split(",").join("")) * 100).toFixed(1) }%</td>
    <td className="text-success d-none d-sm-table-cell">{recovered}</td>
    <td className="d-none d-sm-table-cell">{critical}</td>
  </tr>
);

export default Country;