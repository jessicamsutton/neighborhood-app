import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    markers: this.props.allLocations,
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    console.log(marker);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {},
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

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onMapClick} >
                <div>
                  <h3>{this.state.selectedPlace.name}</h3>
                </div>
            </InfoWindow>

        </Map>
      </main>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyACukLzS9_nvdIVFzuZ5RuOIzK4qTGdzo8',
})(MapContainer)
