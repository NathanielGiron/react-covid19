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
    const usastat = 'https://www.ncovid19.it/api/v1/CasesInAllUSStates.php';

      fetch(usastat)
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        const sorted = _.orderBy(data1, (obj) => {
          return parseInt((obj.New_Cases).split(",").join(""));
        }, ['desc']);

        let activeCases = Object.values(sorted[1])[7];
        console.log(activeCases);

        this.setState({
          total_cases: sorted[1].New_Cases,
          total_deaths: sorted[1].New_Deaths,
          active_cases: activeCases,
          new_cases: sorted[1].Total_Deaths,
          new_deaths: sorted[1].Active_Deaths,
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
      if (state.USAState === "Total:") {
        return false;
      }
      return state.Tatal_Cases.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return filteredStates.map((item) => (
      <State 
        key={item.Tatal_Cases} 
        state={item.Tatal_Cases} 
        cases={item.New_Cases} 
        new_cases={item.Total_Deaths}
        deaths={item.New_Deaths} 
        new_deaths={item.Active_Deaths} 
        TotCases_1M_Pop={item.Total_Tests}
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
                <p className="d-block d-sm-none text-light-2">*Change your phone orientation to landscape to see the rest of the columns.</p>
                <table className="table table-dark table-sm table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">State</th>
                      <th scope="col">Confirmed</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Cases</th>
                      <th scope="col">Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">New Deaths</th>
                      <th scope="col" className="d-none d-sm-table-cell">Fatality Rate</th>
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

export default UsCases;