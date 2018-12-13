import React, { Component } from "react";
import './Event.css';

function getAReadableDate(time) {
  const date = new Date(time);
  const options = {
    weekday: 'long', month: 'long', day: 'numeric'
  };
  return `${date.toLocaleDateString('en-US', options)}`;
}

class Event extends Component {
  render() {
    return (
      <div className="Event">
        <h2>
          <small className="like-a-rolling-stone">{getAReadableDate(this.props.event.time)}</small>&nbsp;
          {this.props.event.name}
          <small className="like-a-rolling-stone to-rsvp">
            <a className="make-me-like-a-button" href={this.props.event.link}>RSVP</a>
          </small>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.event.description }}></div>
      </div>
    );
  }
}
export default Event;
