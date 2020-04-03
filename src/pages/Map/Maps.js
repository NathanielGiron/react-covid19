import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl, RotationControl, Layer, Feature, Popup } from 'react-mapbox-gl';
import './maps.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibmF0MDgiLCJhIjoiY2s4aTluYmlqMDN1MTNkcDZic2l3azJseiJ9.NEmPNalP_mwGtgxSkBf9kg'
});

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedMarker: null
    };
  }

  static defaultProps = {
    style: 'mapbox://styles/mapbox/dark-v10',
    center: {
      lat: 28.0339,
      lng: 1.6596
    },
    zoom: [2]
  }

  componentDidMount() {
    const mapdata = 'https://covid19-server.chrismichael.now.sh/api/v1/JohnsHopkinsDataDailyReport';

    fetch(mapdata)
    .then((response1) => {
      return response1.json();
    })
    .then((data1) => {
      console.log(data1.data.table);

      this.setState({
        data: data1.data.table
      })
    })
    .catch((error) => console.log(error));
  }

  selectedMarker = (obj) => {
    this.setState({
      selectedMarker: obj
    });
  }

  closePopup = () => {
    this.setState({
      selectedMarker: null
    });
  }

  renderMarkers = () => {
    const { data } = this.state;

    return data.map((item) => (
      <Feature 
        key={item.Combined_Key} 
        coordinates={[item.Long_, item.Lat]} 
        onClick={() => (
          this.selectedMarker(item)
        )}
        className="marker"
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
      return(
        <div className="row pt-2">
          <div className="col">
            <Map
              style={this.props.style}
              containerStyle={{
                height: '90vh',
                width: '100%'
              }}
              zoom={this.props.zoom}
              center={this.props.center}
            >
              <ZoomControl />
              <RotationControl />
              <Layer 
                type="circle"
                onMouseEnter=""
                paint={{
                  'circle-radius': 5,
                  'circle-color': '#FF0000',
                  'circle-opacity': 0.6
              }}>
                {this.renderMarkers()}
              </Layer>
              {this.state.selectedMarker !== null ? (
                <Popup
                coordinates={[this.state.selectedMarker.Long_, this.state.selectedMarker.Lat]} 
                style={{'width': '200px'}}
                >
                  <div>
                    <span className="float-right cursor-pointer" onClick={this.closePopup}>&times;</span>
                    <strong>{this.state.selectedMarker.Combined_Key}</strong>
                    <br /><br />
                    <strong>Confirmed: </strong><span className="text-danger">{this.state.selectedMarker.Confirmed}</span><br />
                    <strong>Deaths: </strong><span className="">{this.state.selectedMarker.Deaths}</span><br />
                    <strong>Recovered: </strong><span className="text-success">{this.state.selectedMarker.Recovered}</span><br />
                  </div>
                </Popup>
              ) : null}
            </Map>
          </div>
        </div>
      );
    }
  }
}

export default Maps;