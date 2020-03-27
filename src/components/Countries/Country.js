import React from 'react';

const Country = ({country, cases, deaths, recovered}) => (
    <tbody>
      <tr>
        <th scope="row">{country}</th>
        <td>{cases}</td>
        <td>{deaths}</td>
        <td>{recovered}</td>
      </tr>
    </tbody>
  
);

export default Country;