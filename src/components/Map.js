import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  componentDidMount() {
    window.gm_authFailure = () => {
      return <div><p>Map failed to load.</p></div>;
    };
  }

  render() {
    return (
      <main className="map-container">
        <Map
          google={window.google}
          role="application"
          aria-label="map"
          className="map"
          initialCenter={{ lat: 43.29, lng: -0.352 }}
          zoom={13}
          onClick={this.props.closeModal}
        >
          {this.props.filteredLocations.map((location, index) =>
            <Marker
              key={index}
              name={location.name}
              position={{ lat: location.position.lat, lng: location.position.lng }}
              onClick={this.props.onMarkerClick}
              animation={location.name === this.props.selectedName ?
                this.props.google.maps.Animation.BOUNCE : {}}
            />
          )}
        </Map>
      </main>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyACukLzS9_nvdIVFzuZ5RuOIzK4qTGdzo8',
})(MapContainer)
