import React, { Component } from "react";
import Event from './event';

class EventList extends Component {
  createEvents = (events) => {
    if (!events) {
      return;
    }
    return events.map((event, i) => {
      return <Event key={i} event={event} />
    });
  }
  render() {
    return (
      <div>
        {this.createEvents(this.props.events)}
      </div>
    );
  }
}
export default EventList;
