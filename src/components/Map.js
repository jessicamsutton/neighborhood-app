import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  render() {
    return (
      <main className="map-container">
        <Map
          role="application"
          aria-label="map"
          google={this.props.google}
          className="map"
          initialCenter={{ lat: 43.295, lng: -0.362 }}
          zoom={14}
          onClick={this.props.closeInfoWindow}
        >

          {this.props.filteredLocations.map((location, index) =>
              <Marker
                className="markers"
                key={index}
                name={location.name}
                position={{ lat: location.pos.lat, lng: location.pos.lng }}
                onClick={this.props.onMarkerClick}
                animation={location.name === this.props.activeMarker.name ? this.props.google.maps.Animation.BOUNCE : {}}
              />
          )}

            <InfoWindow
              className="info-window"
              marker={this.props.activeMarker}
              visible={this.props.showingInfoWindow}
              onClose={this.props.closeInfoWindow} >
                <div>
                  <h3>{this.props.selectedPlace.name}</h3>
                  <img src={this.props.infoWindowImage} alt={this.props.selectedPlace.name} />
                  <p>Photo provided by Foursquare</p>
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
