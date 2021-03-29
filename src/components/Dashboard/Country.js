import React from 'react';
import { Link } from 'react-router-dom';

const Country = ({ country, cases, new_cases, deaths, new_deaths, recovered, critical, tests, population}) => ( 
  <tr>
    <td><strong>{country}</strong>{country === 'USA' ? <Link className='btn btn-sm btn-primary float-right' to='/us-cases'>Expand</Link> : ''}</td>
    <td className="text-danger"><small className="text-info d-block d-sm-none">{new_cases}</small>{cases}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{new_cases}</td>
    <td><small className="text-info d-block d-sm-none">{new_deaths}</small>{deaths}</td>
    <td className="text-light-2 d-none d-sm-table-cell">{new_deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ deaths ? (parseInt(deaths.split(",").join("")) / parseInt(cases.split(",").join("")) * 100).toFixed(1) + '%' : '' }</td>
    <td className="text-success d-none d-sm-table-cell">{recovered}</td>
    <td className="d-none d-sm-table-cell">{critical}</td>
    <td className="d-none d-sm-table-cell">{tests}</td>
    <td className="d-none d-sm-table-cell"><small>{population}</small></td>
  </tr>
);

export default Country;