import React from 'react';
import Countries from './Countries/Countries';
import { FaPlus } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <div>
                
                <Countries />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
