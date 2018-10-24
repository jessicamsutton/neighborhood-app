import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Header from './components/Header.js';
import Locations from './components/Locations.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Locations />
        <Map />
      </div>
    );
  }
}

export default App;
