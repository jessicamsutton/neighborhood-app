import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 43.29,
      lng: -0.37
    },
    zoom: 20
  };

  render() {
    return (
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyACukLzS9_nvdIVFzuZ5RuOIzK4qTGdzo8' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <AnyReactComponent
          lat={43.2951}
          lng={-0.370797}
          text={'Pau, France'}
        />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
