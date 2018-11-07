import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    markers: this.props.allLocations,
    activeMarker: null,
    showingInfoWindow: false,
  }

  onMarkerClick = (props, marker, e) => {
    console.log(marker);

    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <main className="map-container">
        <Map
          role="application"
          aria-label="map"
          google={this.props.google}
          initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          zoom={this.props.zoom}
          onClick={this.onMapClick}
        >

          {this.state.markers.map((location, index) =>
              <Marker
                key={index}
                name={location.name}
                position={{ lat: location.pos.lat, lng: location.pos.lng }}
                onClick={this.onMarkerClick}
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
