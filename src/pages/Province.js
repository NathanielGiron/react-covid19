import React from 'react';

const Province = ({ province, cases, deaths }) => ( 
  <tr>
    <td><strong>{province}</strong></td>
    <td className="text-danger">{cases}</td>
    <td>{deaths}</td>
    <td className="text-info d-none d-sm-table-cell">{ deaths ? (parseInt(deaths.split(",").join("")) / parseInt(cases.split(",").join("")) * 100).toFixed(1) + '%' : '' }</td>
  </tr>
);

export default Province;