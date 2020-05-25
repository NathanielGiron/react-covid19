import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className='navbar-brand' to='/'>
      <i className="fas fa-viruses"></i> COVID-19 Tracker
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className='nav-link' to='/'>
            Global
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/maps'>
            Maps
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/us-cases'>
            United States
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/ca-cases'>
            Canada
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/asean'>
            ASEAN
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/about'>
            About
          </Link>
        </li>
      </ul>
      <Link className="btn btn-outline-success" to='/calculator'>Survival Rate Calculator</Link>
    </div>
  </nav>
)

export default NavBar;

