import React from 'react';

const Country = ({country, cases, new_cases, deaths, new_deaths, recovered, critical}) => (
    <tbody>
      <tr>
        <th>{country}</th>
        <td className="text-danger">{cases}</td>
        <td className="text-muted">+{new_cases}</td>
        <td>{deaths}</td>
        <td className="text-muted">+{new_deaths}</td>
        <td className="text-info">{ (parseFloat(deaths.split(",").join("")) / parseFloat(cases.split(",").join("")) * 100).toFixed(1) }%</td>
        <td className="text-success">{recovered}</td>
        <td>{critical}</td>
      </tr>
    </tbody>
);

export default Country;