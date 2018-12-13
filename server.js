const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cachedRequest = require('cached-request')(request);
const cacheDirectory = '/tmp/cache';
const enforce = require('express-sslify');

const app = express();
const PORT = process.env.PORT || 5000;
const { MEET_UP_API_KEY } = process.env;
const MEET_UP_API_ENDPOINT = 'https://api.meetup.com';
const MEET_UP_GROUP_NAME = 'Bad-Movie-Night-San-Francisco';

// Cache setup
cachedRequest.setCacheDirectory(cacheDirectory);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls

const groupUrlRoot = `${MEET_UP_API_ENDPOINT}/${MEET_UP_GROUP_NAME}`;

function getEvents() {
  return `${groupUrlRoot}/events`;
}

function getEventPhotosById(eventId) {
  return `${groupUrlRoot}/events/${eventId}/photos`;
}

app.get('/api/events', (req, res) => {
  const url = getEvents();
  const qs = {
    key: MEET_UP_API_KEY,
  };
  cachedRequest({ url, qs }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.get('/api/event/:eventId/photos', (req, res) => {
  const { eventId } = req.params;
  const url = getEventPhotosById(eventId);
  const qs = {
    key: MEET_UP_API_KEY,
  };

  cachedRequest({ url, qs }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});
if (process.env.NODE_ENV === 'production') {
  // Upgrade to HTTPS 5ever
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
