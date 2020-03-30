import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './NavBar';
import AboutPage from '../pages/AboutPage';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/about' component={AboutPage} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
