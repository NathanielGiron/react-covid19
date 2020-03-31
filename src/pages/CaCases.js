import React, { Component } from 'react';
import _ from 'lodash';
import Overview from '../components/Overview';
import Province from './Province';
import SearchBox from '../components/SearchBox';
import '../components/Dashboard/dashboard.css';

class CaCases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_cases: '',
      total_deaths: '',
      data: [],
      searchField: ''
    };
  }

  componentDidMount() {
    const canadastat = 'https://api.apify.com/v2/key-value-stores/fabbocwKrtxSDf96h/records/LATEST?disableRedirect=true';

      fetch(canadastat)
      .then((response1) => {
        return response1.json();
      })
      .then((data1) => {
        const sorted = _.orderBy(data1.infectedByRegion, (obj) => {
          return parseInt((obj.infectedCount).split(",").join(""));
        }, ['desc']);

        this.setState({
          total_cases: data1.infected,
          total_deaths: data1.deceased,
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

    const filteredProvinces = data.filter(province => {
      return province.region.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return filteredProvinces.map((item) => (
      <Province 
        key={item.region} 
        province={item.region} 
        cases={item.infectedCount} 
        deaths={item.deceasedCount} 
      />
    ));
  }
  
  render() {
    if (!this.state.data.length) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary mt-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row pt-2">
          <div className="col-xs-12 col-sm-12 col-md-2">
            <Overview
              cases_location='Canada'
              total_cases={this.state.total_cases}
              total_recovered={''}
              total_deaths={this.state.total_deaths}
              active_cases={''}
              new_cases={''}
              new_deaths={''}
            />
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-10">
            <div className="card bg-light">
              <div className="card-body">
                <h5><i class="fab fa-canadian-maple-leaf"></i> Canada Data</h5>
                <SearchBox searchChange={this.onSearchChange} placeholder="Search Province..." />
                <p className="d-block d-sm-none">*Change your phone orientation to landscape to see the rest of the columns.</p>
                <table className="table table-bordered table-sm table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Province</th>
                      <th scope="col">Confirmed</th>
                      <th scope="col">Deaths</th>
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

export default CaCases;