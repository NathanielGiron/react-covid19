import React, { Component } from 'react';
import Country from './Country.js';

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      last_updated: ''
    };
  }

  componentDidMount() {
    const url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php';

    fetch(url, {
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': 'db8507b918msh2483411d3af86f5p14b46fjsn387b90831280'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data.countries_stat,
          last_updated: data.statistic_taken_at
        })
        console.log(data.countries_stat);
      })
      .catch((error) => console.log(error));
  }

  renderItems() {
    return this.state.data.map((item) => (
      <Country key={item.country_name} country={item.country_name} cases={item.cases} deaths={item.deaths} recovered={item.total_recovered} />
    ));
  }
  
  render() {
    return (
      <div>
        <strong>Last Updated:</strong> {this.state.last_updated} GMT
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Confirmed</th>
              <th scope="col">Deaths</th>
              <th scope="col">Recovered</th>
            </tr>
          </thead>
          {this.renderItems()}
        </table>
      </div>
    );
  }
}

export default Countries;