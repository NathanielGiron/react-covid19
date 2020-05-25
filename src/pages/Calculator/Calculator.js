import React, { Component } from 'react';
import Result from './Result';

const initialState = {
  age: 0,
  sex: 0,
  pemc: 0,
  npemc: 0,
  result: 0
};

class Calculator extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  onAgeChange = (event) => {
    this.setState({
      age: parseFloat(event.target.value)
    })
  }

  onGenderChange = (event) => {
    this.setState({
      sex: parseFloat(event.target.value)
    })
  }

  onCheckChange = (event) => {
    if(event.target.checked) {
      this.setState({ 
        pemc: this.state.pemc + parseFloat(event.target.value),
        npemc: this.state.npemc + 1 
      })
      
    } else {
      this.setState({ 
        pemc: this.state.pemc - parseFloat(event.target.value),
        npemc: this.state.npemc - 1 
      })
    }
  }

  renderResultBox() {  
    let message = <p>If infected we estimate you have a <strong><u>{(this.state.result).toFixed(3)}%</u></strong> chance of dying COVID-19.</p>;
    
    return(
      <Result message={message} />
    );
  }

  calculate = () => {
    const { age, sex, pemc, npemc } = this.state;

    if(age === 0 && sex === 0 && npemc === 0) {
      this.setState({result:.9});
    } else if(age === 0 && sex === 0) {
      let result = (1) * (pemc - (npemc-1));

      this.setState({result:result});
    } else if(npemc === 0) {
      let result = (age+sex) * (.9);

      this.setState({result:result})
    } else {
      let result = (age+sex) * (pemc - (npemc-1))
      
      if(result>92) {
        result = 92;
      }
      this.setState({result:result})
    }
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6 ">
          <div className="jumbotron mt-2 bg-dark text-light-2">
            <h1 className="text-center mb-4">Survival Rate Calculator</h1>

            { this.state.result ? this.renderResultBox() : null}
            
            <h4 className="mt-4 pt-4">Age*</h4>
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value=".2" required onClick={this.onAgeChange} /> 0 - 19
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value=".2" onClick={this.onAgeChange} /> 20 - 39
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value=".4" onClick={this.onAgeChange} /> 40 - 49
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value="1.3" onClick={this.onAgeChange} /> 50 - 59
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value="3.6" onClick={this.onAgeChange} /> 60 - 69
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value="8.0" onClick={this.onAgeChange} /> 70 - 79
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="age" value="14.8" onClick={this.onAgeChange} /> 80+
              </label>
            </div>

            <h4 className="mt-4">Sex*</h4>
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-primary mr-2">
                <input type="radio" name="sex" value=".15" required onClick={this.onGenderChange} /> Male
              </label>

              <label className="btn btn-primary mr-2">
                <input type="radio" name="sex" value=".035" onClick={this.onGenderChange} /> Female
              </label>
            </div>

            <h4 className="mt-4">Pre-existing Medical Conditions</h4>
            <div className="custom-control custom-switch h5">
              <input type="checkbox" className="custom-control-input" id="customSwitch1" value="10.5" onChange={this.onCheckChange} />
              <label className="custom-control-label" htmlFor="customSwitch1">Cardiovascular disease</label>
            </div>
            <div className="custom-control custom-switch h5">
              <input type="checkbox" className="custom-control-input" id="customSwitch2" value="7.3" onChange={this.onCheckChange} />
              <label className="custom-control-label" htmlFor="customSwitch2">Diabetes</label>
            </div>
            <div className="custom-control custom-switch h5">
              <input type="checkbox" className="custom-control-input" id="customSwitch3" value="6.3" onChange={this.onCheckChange} />
              <label className="custom-control-label" htmlFor="customSwitch3">Chronic respiratory disease</label>
            </div>
            <div className="custom-control custom-switch h5">
              <input type="checkbox" className="custom-control-input" id="customSwitch4" value="6" onChange={this.onCheckChange} />
              <label className="custom-control-label" htmlFor="customSwitch4">Hypertension</label>
            </div>
            <div className="custom-control custom-switch h5">
              <input type="checkbox" className="custom-control-input" id="customSwitch5" value="5.6" onChange={this.onCheckChange} />
              <label className="custom-control-label" htmlFor="customSwitch5">Cancer</label>
            </div>

            <div className="text-center mt-4 pt-4">
              <button type="button" className="btn btn-outline-success btn-lg" onClick={this.calculate}>Calculate!</button>
            </div>
            <br /><br />
            <small>Data Source: <a href="https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/" target="_blank">worldometers.info</a></small>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;