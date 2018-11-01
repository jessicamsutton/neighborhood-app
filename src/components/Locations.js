import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';


class Locations extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
  }


  render(){
    return(
      <div className="locations-container">

        <div className="input-container">
          <DebounceInput
            type="text"
            placeholder="Search locations..."
            minLength={2}
            debounceTimeout={300}
            onChange={event => this.setState({value: event.target.value})}
          />
        </div>

        <p>This is the list of locations</p>
      </div>
    )
  }
};

export default Locations;
