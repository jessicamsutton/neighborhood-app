import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.allLocations,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      animation: {},
      currentId: null,
      infoWindowImage: {}
    }
  }

  // Using Foursquare API to retrieve data for locations
  getFoursquareData = () => {
     const FS_ID = 'VOYM5L31IRNAHBD0ILUAETR53NCI1UMFDNKDUIOYBE5AOOPN'
     const FS_SECRET = 'HF0PPL2PEPWEGACV2KJVOYIG1K0HVOJGOVJ4LB50Q041HOJ2';
     const YYYYMMDD = '20181231';
     let url = `https://api.foursquare.com/v2/venues/search?ll=${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}&query=${this.state.selectedPlace.name}&v=${YYYYMMDD}&client_id=${FS_ID}&client_secret=${FS_SECRET}`

      // Finds venue on Foursquare
      fetch(url)
      .then((res) => res.json())
      .then(function(results) {
        let currentId = results.response.venues[0].id;

        // Finds photo for venue on Foursquare
        return fetch(`https://api.foursquare.com/v2/venues/${currentId}/photos?&client_id=${FS_ID}&client_secret=${FS_SECRET}&v=${YYYYMMDD}`);
      })
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          infoWindowImage: results.response.photos.items[0].prefix + '300x300' + results.response.photos.items[0].suffix,
        });
      })
      .catch(function(error) {
        console.log('Error: ', error);
      })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    this.getFoursquareData();
  }

  closeInfoWindow = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        infoWindowImage: {},
        showingInfoWindow: false,
        activeMarker: {},
        animation: {}
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
          className="map"
          initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          zoom={this.props.zoom}
          onClick={this.closeInfoWindow}
        >

          {this.props.filteredLocations.map((location, index) =>
              <Marker
                className="markers"
                key={index}
                name={location.name}
                position={{ lat: location.pos.lat, lng: location.pos.lng }}
                onClick={this.onMarkerClick}
                animation={location.name === this.state.activeMarker.name ? this.props.google.maps.Animation.BOUNCE : {}}
              />
          )}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.closeInfoWindow} >
                <div>
                  <h3>{this.state.selectedPlace.name}</h3>
                  <img src={this.state.infoWindowImage} alt={this.state.selectedPlace.name} />
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
