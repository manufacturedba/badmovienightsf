/*global fbq */

import React, { Component } from "react";
import './Event.css';

function getAReadableDate(time) {
  const date = new Date(time);
  const options = {
    weekday: 'long', month: 'long', day: 'numeric'
  };
  return `${date.toLocaleDateString('en-US', options)}`;
}

function getEventPhotoObj(event) {
  if (!event.photos) {
    return {};
  }

  const { photos } = event;
  return {
    highres_link: photos[0].highres_link,
    caption: photos[0].caption,
  }
}

function punchItChewie() {
  fbq('track', 'ViewContent');
}

class Event extends Component {
  render() {
    return (
      <div className="Event">
        <img className="the-main-attraction-photo" src={getEventPhotoObj(this.props.event).highres_link} alt={getEventPhotoObj(this.props.event).caption} />
        <h2>
          <small className="like-a-rolling-stone">{getAReadableDate(this.props.event.time)}</small>&nbsp;
          {this.props.event.name}
          <small className="like-a-rolling-stone to-rsvp">
            <a className="make-me-like-a-button" onClick={punchItChewie} href={this.props.event.link}>RSVP</a>
          </small>
        </h2>
        <div className="i-can-read" dangerouslySetInnerHTML={{ __html: this.props.event.description }}></div>
      </div>
    );
  }
}
export default Event;
