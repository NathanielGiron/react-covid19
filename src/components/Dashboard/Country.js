import React from 'react';

const Country = ({ country, cases, new_cases, deaths, new_deaths, recovered, critical}) => ( 
  <tr>
    <td><strong>{country}</strong></td>
    <td className="text-danger">{cases}</td>
    <td className="text-muted">{new_cases === '0' ? '' : '+' + new_cases}</td>
    <td>{deaths}</td>
    <td className="text-muted">{new_deaths === '0' ? '' : '+' + new_deaths}</td>
    <td className="text-info">{ (parseFloat(deaths.split(",").join("")) / parseFloat(cases.split(",").join("")) * 100).toFixed(1) }%</td>
    <td className="text-success">{recovered}</td>
    <td>{critical}</td>
  </tr>
);

export default Country;