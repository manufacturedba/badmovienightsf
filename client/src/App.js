import React, { Component } from 'react';
import EventList from './components/event-list';
import "./App.css";
class App extends Component {
  state = {
    events: "",
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ events: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/api/events");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    return (
      <div className="App">
        <EventList events={this.state.events} />
      </div>
    );
  }
}
export default App;
