import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import MapContainer from './components/Map.js';
import Modal from './components/Modal.js';
import locations from './data/locations.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allLocations: locations,
      filteredLocations: locations,
      activeMarker: {},
      selectedPlace: {},
      isHidden: true,
      currentId: {},
      modalImage: '',
    }
  }

  // Using Foursquare API to retrieve data for locations
  getFoursquareData = (location) => {
     const CLIENT_ID = 'TYYZT41TMZVGX5XKNP5VYZH3LNMXZS4DV2ACIJRT5CZY0PFC'
     const CLIENT_SECRET = 'VJTTMEMG4MZYYOVY2THWAXP05GEAPE2W5WARIUG3KSN4OBZB';
     const YYYYMMDD = '20181231';
     let url = `https://api.foursquare.com/v2/venues/search?ll=${location.position.lat},${location.position.lng}&query=${location.name}&v=${YYYYMMDD}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

      // Finds venue on Foursquare
      fetch(url)
      .then((res) => res.json())
      .then(function(results) {
        let currentId = results.response.venues[0].id;

        // Finds photo for venue on Foursquare
        return fetch(`https://api.foursquare.com/v2/venues/${currentId}/photos?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${YYYYMMDD}`);
      })
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          modalImage: results.response.photos.items[0].prefix + '300x300' + results.response.photos.items[0].suffix,
        });
      })
      .catch(function(error) {
        console.log('Error: ', error);
      })
  }

  // Initiate marker animation and display modal with selected marker's data
  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      selectedName: marker.name,
      isHidden: false,
    });

    this.getFoursquareData(this.state.selectedPlace);
  }

  // Initiate marker animation and and display modal with selected list item's data
  onListItemClick = (location) => {
    this.setState({
      selectedPlace: location,
      selectedName: location.name,
      isHidden: false,
    })

    this.getFoursquareData(location);
  }

  // Close InfoWindow upon clicking elsewhere
  closeModal = () => {
    this.setState({
      isHidden: true,
      modalImage: {},
      activeMarker: {},
      selectedPlace: {},
      selectedName: {},
    })
  }

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
          filteredLocations={this.state.filteredLocations}
          onMarkerClick={this.onMarkerClick}
          selectedName={this.state.selectedName}
        />
        <Sidebar
          filteredLocations={this.state.filteredLocations}
          filterLocations={this.filterLocations}
          selectedName={this.state.selectedName}
          onListItemClick={this.onListItemClick}
          />
        {!this.state.isHidden &&
            <Modal
              isHidden={this.state.isHidden}
              activeMarker={this.state.activeMarker}
              modalImage={this.state.modalImage}
              closeModal={this.closeModal}
            />
          }
      </div>
    )
  }
}

export default App;
