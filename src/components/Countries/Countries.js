import React, { Component } from 'react';
import _ from 'lodash';
import Country from './Country.js';
import SearchBox from '../SearchBox';

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_cases: '',
      total_recovered: '',
      total_deaths: '',
      new_cases: '',
      new_deaths: '',
      data: [],
      last_updated: '',
      searchField: ''
    };
  }

  componentDidMount() {
    const worldstat = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php';
    const cases_by_country = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php';

      fetch(worldstat, {
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'db8507b918msh2483411d3af86f5p14b46fjsn387b90831280'
        }
      })
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        this.setState({
          total_cases: data1.total_cases,
          total_recovered: data1.total_recovered,
          total_deaths: data1.total_deaths,
          new_cases: data1.new_cases,
          new_deaths: data1.new_deaths
        })
      })
      .then(() => {
        fetch(cases_by_country, {
          headers: {
            'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
            'x-rapidapi-key': 'db8507b918msh2483411d3af86f5p14b46fjsn387b90831280'
          }
        })
        .then((response2) => {
          return response2.json();
        })
        .then((data2) => {

          const sorted = _.orderBy(data2.countries_stat, (obj) => {
            return parseInt((obj.cases).split(",").join(""));
          }, ['desc'])

          this.setState({
            data: sorted,
            last_updated: data2.statistic_taken_at
          })
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
      return country.country_name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return filteredCountries.map((item) => (
      <Country 
        key={item.country_name} 
        country={item.country_name} 
        cases={item.cases} 
        new_cases={item.new_cases}
        deaths={item.deaths} 
        new_deaths={item.new_deaths} 
        recovered={item.total_recovered} 
        critical={item.serious_critical} />
    ));
  }
  
  render() {
    return (
      <div>
        <div className="row pt-2">
          <div className="col-xs-12 col-sm-12 col-md-2">
            <div className="card bg-light">
              <div className="card-body">
                <strong>Total Confirmed Cases:</strong> <h4 className="text-danger">{this.state.total_cases}</h4>
                <strong>Active Cases:</strong> <span className="text-primary">{(parseInt((this.state.total_cases.split(",").join(""))) - (parseInt((this.state.total_recovered).split(",").join("")) + parseInt((this.state.total_deaths).split(",").join("")))).toLocaleString()}</span> <br />
                <strong>Recovered Cases:</strong> <span className="text-success">{this.state.total_recovered}</span> <br />
                <strong>Fatal Cases:</strong> {this.state.total_deaths} <br />
                <br />
                <strong>New Cases:</strong> {this.state.new_cases} <br />
                <strong>New Deaths:</strong> {this.state.new_deaths}

                <br /><br />
                <small>Last Updated: <br></br> {this.state.last_updated} GMT </small>
              </div>
            </div>
              
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10">
            <SearchBox searchChange={this.onSearchChange} />

            <table className="table table-bordered table-hover rounded">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Confirmed</th>
                  <th scope="col">New Cases</th>
                  <th scope="col">Deaths</th>
                  <th scope="col">New Deaths</th>
                  <th scope="col">Recovered</th>
                  <th scope="col">Critical</th>
                </tr>
              </thead>
              {this.renderItems()}
            </table>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Countries;