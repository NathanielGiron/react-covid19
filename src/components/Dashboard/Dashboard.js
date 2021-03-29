import React, { Component } from 'react';
import _ from 'lodash';
import Overview from '../Overview';
import Country from './Country';
import SearchBox from '../SearchBox';
import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_cases: '',
      total_recovered: '',
      total_deaths: '',
      active_cases: '',
      new_cases: '',
      new_deaths: '',
      data: [],
      last_updated: '',
      searchField: ''
    };
  }

  componentDidMount() {
    const worldstat = 'https://www.ncovid19.it/api/v1/AllReports.php';

      fetch(worldstat)
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        const sorted = _.orderBy(data1.reports[0].table[0], (obj) => {
          return parseInt((obj.TotalCases).split(",").join(""));
        }, ['desc']);

        this.setState({
          total_cases: data1.reports[0].cases,
          total_deaths: data1.reports[0].deaths,
          total_recovered: data1.reports[0].recovered,
          active_cases: data1.reports[0].active_cases[0].currently_infected_patients,
          data: sorted,
          new_cases: sorted[0].NewCases,
          new_deaths: sorted[0].NewDeaths
        })
      })
      .catch((error) => console.log(error));
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }

  renderItems() {
    const { data } = this.state;

    const filteredCountries = data.filter(country => {
      if (country.Country === "Total:") {
        return false;
      }
      return country.Country.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return filteredCountries.map((item) => (
      <Country 
        key={item.Country} 
        country={item.Country} 
        cases={item.TotalCases} 
        new_cases={item.NewCases}
        deaths={item.TotalDeaths} 
        new_deaths={item.NewDeaths} 
        recovered={item.TotalRecovered} 
        critical={item.SeriousCritical} 
        tests={item.TotalTests} 
        population={item.Population}
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
              cases_location='Global'
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
                <h5 className="text-light"><i className="fas fa-globe-americas"></i> Global Data</h5>
                <SearchBox searchChange={this.onSearchChange} placeholder="Search Country..." />
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
                      <th scope="col" className="d-none d-sm-table-cell">Population</th>
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

export default Dashboard;