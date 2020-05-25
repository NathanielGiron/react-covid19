import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard/Dashboard';
import Maps from '../pages/Map/Maps';
import UsCases from '../pages/UsCases/UsCases';
import CaCases from '../pages/CaCases/CaCases';
import AboutPage from '../pages/About/AboutPage';
import Asean from '../pages/Asean/Asean';
import Calculator from '../pages/Calculator/Calculator';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/maps' component={Maps} />
          <Route path='/us-cases' component={UsCases} />
          <Route path='/ca-cases' component={CaCases} />
          <Route path='/asean' component={Asean} />
          <Route path='/about' component={AboutPage} />
          <Route path='/calculator' component={Calculator} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
