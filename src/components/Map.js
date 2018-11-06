import React, { Component } from 'react';
import '../data/locations.json';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <main className="map-container">
        <p>This is a map. Trust me.</p>
      </main>
    );
  }
}

export default MapContainer;
