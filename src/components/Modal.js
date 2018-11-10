import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal" aria-modal="true">
        <div className="modal-content">
          <h3>{this.props.activeMarker.name}</h3>
          <img src={this.props.modalImage} alt={this.props.activeMarker.name} />
          <p>Photo provided by Foursquare</p>
          <button aria-labelledby="Close" className="close-button" onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
    )
  }
}

export default Modal;
