import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/Map.js';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import locations from './data/locations.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allLocations: locations,
      filteredLocations: locations,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      animation: {},
      currentId: {},
      infoWindowImage: {}
    }
  }

  // Using Foursquare API to retrieve data for locations
  getFoursquareData = (selectedPlace) => {
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
          infoWindowImage: results.response.photos.items[0].prefix + '100x100' + results.response.photos.items[0].suffix,
        });
      })
      .catch(function(error) {
        console.log('Error: ', error);
      })
  }

  // Display InfoWindow upon corresponding marker being clicked
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    console.log(props);
    console.log(marker);

    this.getFoursquareData(this.state.selectedPlace);
  }

  onListItemClick = (props) => {
    console.log(props);
  };

  // Close InfoWindow upon clicking elsewhere
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

  // Filter locations based on user input, reset when input element is empty
  filterLocations = (query) => {
    if (query === '' || query === undefined) {
      this.setState({
        query: '',
        filteredLocations: this.state.allLocations,
      });
    } else {
      this.setState({
        query: query,
        filteredLocations: this.state.allLocations
          .filter(loc => loc.name.toLowerCase().includes(query.toLowerCase())),
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <MapContainer
          allLocations={this.state.allLocations}
          filteredLocations={this.state.filteredLocations}
          onMarkerClick={this.onMarkerClick}
          closeInfoWindow={this.closeInfoWindow}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          animation={this.state.animation}
          currentId={this.state.currentId}
          infoWindowImage={this.state.infoWindowImage}
           />
         <Sidebar
           filteredLocations={this.state.filteredLocations}
           filterLocations={this.filterLocations}
           onMarkerClick={this.onMarkerClick}
           activeMarker={this.state.activeMarker}
           selectedPlace={this.state.selectedPlace}
           showingInfoWindow={this.state.showingInfoWindow}
           animation={this.state.animation}
           currentId={this.state.currentId}
           infoWindowImage={this.state.infoWindowImage}
           onListItemClick={this.onListItemClick} />
      </div>
    )
  }
}

export default App;
