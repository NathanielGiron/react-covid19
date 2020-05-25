import React, { Component } from 'react';
import _ from 'lodash';
import Overview from '../../components/Overview';
import Country from './Country';
import './dashboard.css';

class Asean extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_cases: '',
      total_recovered: '',
      total_deaths: '',
      active_cases: '',
      new_cases: '',
      new_deaths: '',
      data: []
    };
  }

  componentDidMount() {
    const worldstat = 'https://covid19-server.chrismichael.now.sh/api/v1/AllReports';

      fetch(worldstat)
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        const sorted = _.orderBy(data1.reports[0].table[0], (obj) => {
          return parseInt((obj.TotalCases).split(",").join(""));
        }, ['desc']);

        const asean = ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"];


        const lookup = _.keyBy(asean, function(c) { return c });
        const result = _.filter(sorted, function(c) {
            return lookup[c.Country] !== undefined;
        });

        let cases = 0;
        let active = 0;
        let recovered = 0;
        let deaths = 0;
        let newCases = 0;
        let newDeaths = 0;

        for (let i=0; i<result.length; i++) {
          cases += result[i].ActiveCases ? parseInt(result[i].TotalCases.split(",").join("")) : 0;
          active += result[i].ActiveCases ? parseInt(result[i].ActiveCases.split(",").join("")) : 0;
          recovered += result[i].TotalRecovered ? parseInt(result[i].TotalRecovered.split(",").join("")) : 0;
          deaths += result[i].TotalDeaths ? parseInt(result[i].TotalDeaths.split(",").join("")) : 0;
          newCases += result[i].NewCases ? parseInt(result[i].NewCases.split(",").join("")) : 0;
          newDeaths += result[i].NewDeaths ? parseInt(result[i].NewDeaths.split(",").join("")): 0;
        }

        this.setState({
          total_cases: cases,
          total_deaths: deaths,
          total_recovered: recovered,
          active_cases: active,
          data: result,
          new_cases: newCases,
          new_deaths: newDeaths
        })
      })
      .catch((error) => console.log(error));
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }
  
  renderItems() {
    const { data } = this.state;

    return data.map((item) => (
      <Country 
        key={item.Country} 
        country={item.Country} 
        cases={item.TotalCases} 
        new_cases={item.NewCases}
        deaths={item.TotalDeaths} 
        new_deaths={item.NewDeaths} 
        recovered={item.TotalRecovered} 
        critical={item.Serious_Critical} 
        tests={item.TotalTests} 
        TotCases_1M_Pop={item.TotCases_1M_Pop}
      />
    ));
  }
  
  render() {
    if (!this.state.data.length) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-danger mt-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row pt-2" id="dashboard">
          <div className="col-xs-12 col-sm-12 col-md-2">
            <Overview
              cases_location='ASEAN'
              total_cases={this.state.total_cases}
              total_recovered={this.state.total_recovered}
              total_deaths={this.state.total_deaths}
              active_cases={this.state.active_cases}
              new_cases={this.state.new_cases}
              new_deaths={this.state.new_deaths}
            />
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-10 data-div">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-light"><i className="fas fa-globe-asia"></i> ASEAN Data</h5>
                <p className="d-block d-sm-none">*Change your phone orientation to landscape to see the rest of the columns.</p>
                <table className="table table-dark table-sm table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Country</th>
                      <th scope="col">Confirmed</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Cases</th>
                      <th scope="col">Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">Fatality Rate</th>
                      <th scope="col" className="d-none d-sm-table-cell">Recovered</th>
                      <th scope="col" className="d-none d-sm-table-cell">Critical</th>
                      <th scope="col" className="d-none d-sm-table-cell">Total Tests</th>
                      <th scope="col" className="d-none d-sm-table-cell">EST Pop</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderItems()}
                  </tbody>
                </table>
              </div>
            </div>      
          </div>
        </div>
      );
    }
  }
}

export default Asean;