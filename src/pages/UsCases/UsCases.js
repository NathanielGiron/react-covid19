import React, { Component } from 'react';
import _ from 'lodash';
import Overview from '../../components/Overview';
import State from './State';
import SearchBox from '../../components/SearchBox';
import './UsCases.css';

class UsCases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_cases: '',
      total_deaths: '',
      active_cases: '',
      new_cases: '',
      new_deaths: '',
      data: [],
      searchField: ''
    };
  }

  componentDidMount() {
    const usastat = 'https://covid19-server.chrismichael.now.sh/api/v1/CasesInAllUSStates';

      fetch(usastat)
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        const sorted = _.orderBy(data1.data[0].table, (obj) => {
          return parseInt((obj.TotalCases).split(",").join(""));
        }, ['desc']);

        this.setState({
          total_cases: sorted[0].TotalCases,
          total_deaths: sorted[0].TotalDeaths,
          active_cases: sorted[0].ActiveCases,
          new_cases: sorted[0].NewCases,
          new_deaths: sorted[0].NewDeaths,
          data: sorted
        })
      })
      .catch((error) => console.log(error));
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }

  renderItems() {
    const { data } = this.state;

    const filteredStates = data.filter(state => {
      return state.USAState.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return filteredStates.map((item) => (
      <State 
        key={item.USAState} 
        state={item.USAState} 
        cases={item.TotalCases} 
        new_cases={item.NewCases}
        deaths={item.TotalDeaths} 
        new_deaths={item.NewDeaths} 
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
        <div className="row pt-2">
          <div className="col-xs-12 col-sm-12 col-md-2">
            <Overview
              cases_location='U.S.'
              total_cases={this.state.total_cases}
              total_recovered={parseInt(this.state.total_cases.split(",").join("")) - parseInt(this.state.active_cases.split(",").join("")) - parseInt(this.state.total_deaths.split(",").join(""))}
              total_deaths={this.state.total_deaths}
              active_cases={this.state.active_cases}
              new_cases={this.state.new_cases}
              new_deaths={this.state.new_deaths}
            />
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-10 data-div">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-light"><i className="fas fa-flag-usa"></i> United States Data</h5>
                <SearchBox searchChange={this.onSearchChange} placeholder="Search State..." />
                <p className="d-block d-sm-none">*Change your phone orientation to landscape to see the rest of the columns.</p>
                <table className="table table-dark table-sm table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">State</th>
                      <th scope="col">Confirmed</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Cases</th>
                      <th scope="col">Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">Fatality Rate</th>
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

export default UsCases;