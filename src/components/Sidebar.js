import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';
import Locations from '../data/locations.json';


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  render(){
    return(
      <aside className="sidebar">
        <div className="input-container">
          <DebounceInput
            type="text"
            value={this.state.query}
            placeholder="Search locations..."
            minLength={2}
            debounceTimeout={300}
            onChange={event => this.setState({value: event.target.value})}
          />
        </div>
        <ul>
          {
            Locations.map((location) => {
              return  <li className="sidebar-list" key={location.key}>
                        {location.name}
                      </li>
            })
          }
        </ul>
      </aside>
    )
  }
};

export default Sidebar;
