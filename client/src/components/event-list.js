import React, { Component } from "react";

class EventList extends Component {
  createEvents = (events) => {
    if (!events) {
      return;
    }
    return events.map(event => {
      return <div>{event.name}</div>
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
