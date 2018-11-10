import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import {GoogleApiWrapper} from 'google-maps-react';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  render(){
    return (
      <div className="sidebar">
        <div className="input-container">
          <DebounceInput
            className="input"
            type="text"
            value={this.state.query}
            placeholder="Filter by location name"
            minLength={2}
            debounceTimeout={500}
            onChange={e => this.props.filterLocations(e.target.value)}
          />
        </div>
        <div>
          <ul className="sidebar-list">
            {this.props.filteredLocations.map((location, index) =>
              <li
                  key={index}
                  name={location.name}
                  position={{ lat: location.pos.lat, lng: location.pos.lng }}
                  onClick={this.props.onListItemClick(location)}
                  animation={location.name === this.props.activeMarker.name ? this.props.google.maps.Animation.BOUNCE : {}}
              >
                {location.name}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyACukLzS9_nvdIVFzuZ5RuOIzK4qTGdzo8',
})(Sidebar)
