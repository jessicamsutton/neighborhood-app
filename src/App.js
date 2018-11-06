import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/Map.js';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <MapContainer />
      </div>
    );
  }
}

export default App;
