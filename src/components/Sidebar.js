import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { GoogleApiWrapper } from 'google-maps-react';

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
            value={this.query}
            placeholder="Filter by location name"
            minLength={2}
            debounceTimeout={200}
            onChange={e => this.props.filterLocations(e.target.value)}
          />
        </div>
        <div>
          <ul className="sidebar-list">
            {this.props.filteredLocations.map((location, index) =>
              <li
                  key={index}
                  name={location.name}
                  position={{ lat: location.position.lat, lng: location.position.lng }}
                  onClick={e => this.props.onListItemClick(location)}
                  animation={location.name === this.props.selectedName ?
                    this.props.google.maps.Animation.BOUNCE : {}}
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
