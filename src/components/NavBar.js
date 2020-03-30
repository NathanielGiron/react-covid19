import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className='navbar-brand' to='/'>
      <i className="fas fa-viruses"></i> Real Time COVID-19 Tracker
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className='nav-link' to='/'>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/us-cases'>
            US Cases
          </Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/about'>
            About
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavBar;

