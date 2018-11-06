import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';
import '../data/locations.json';


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  render(){
    return(
      <aside className="locations-container">

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

        <div>

        </div>
          <p>This is the list of locations</p>
      </aside>
    )
  }
};

export default Sidebar;
