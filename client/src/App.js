import React, { Component } from 'react';
import EventList from './components/event-list';
import AboutRoute from './components/about-route';
import ContactRoute from './components/contact-route';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './credit-goes-to-trolls-two.jpeg';
import fingerPointingLol from './finger-pointing-lol.jpeg';
import totallyWorkingCounter from './totally-working-counter.gif';

const HomeRoute = (events) => {
  return <div className="i-am-your-events monster-width">
    <marquee>Upcoming Events</marquee>
    <EventList events={events} />
  </div>
}
class App extends Component {
  state = {
    events: "",
  };
  componentDidMount() {
    this.callEvents()
      .then(events => {
        this.setState({ events });
        return events.map(({ id }) => id);
      })
      .then(ids => {
        return Promise.all(ids.map(id => {
          return this.callEventPhotos(id);
        }));
      })
      .then(packedPhotos => {
        const orignalEvents = this.state.events;
        const allPhotos = packedPhotos.flat();
        const events = orignalEvents.map(event => {
          const photos = allPhotos.filter(photo => photo.photo_album.event.id === event.id);
          return { ...event, photos };
        });
        this.setState({ events });
      })
      .catch(err => console.log(err));
  }
  callEvents = async () => {
    const response = await fetch("/api/events");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  callEventPhotos = async (eventId) => {
    const response = await fetch(`/api/event/${eventId}/photos`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="i-wrap-the-world">
            <div className="i-will-be-your-header flex-container">
              <img className="the-logo flex" src={logo} alt="Trolls 2 OH GOD"/>
              <h1 className="the-title flex">Bad Movie Night: San Francisco</h1>
            </div>
            <div className="i-will-be-your-links monster-width give-it-a-bit-more">
              <img className="wtf-am-i-doing-with-my-life" src={fingerPointingLol} alt="Pointer at links"/>
              <Link className="lunk a-header-lunk" to="/">Home</Link>
              <Link className="lunk a-header-lunk" to="/about">About</Link>
              <Link className="lunk a-header-lunk" to="/contact">Contact</Link>
            </div>
            <Route path="/" exact component={() => HomeRoute(this.state.events)}></Route>
            <Route path="/about" component={AboutRoute}></Route>
            <Route path="/contact" component={ContactRoute}></Route>
            <div className="stinky-footer">
              <div className="i-like-rice">
                <img className="give-it-a-bit-more" alt="Non-functional visitor counter" src={totallyWorkingCounter} />
                <div>
                  <a className="foot-cheese" href="https://www.meetup.com/Bad-Movie-Night-San-Francisco">
                    <FontAwesomeIcon size="2x" icon={['fab', 'meetup']}/>
                  </a>
                  <a className="foot-cheese" href="https://www.facebook.com/groups/927452590788620/">
                    <FontAwesomeIcon size="2x" icon={['fab', 'facebook']}/>
                  </a>
                  <a className="foot-cheese" href="https://www.github.com/manufacturedba/badmovienightsf">
                    <FontAwesomeIcon size="2x" icon={['fab', 'github']}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
