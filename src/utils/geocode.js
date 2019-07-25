const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2xpdmUyMjIyMjIiLCJhIjoiY2p5OHhlb2FjMDR1eDNvbzB2cnRuMDF1OSJ9.NcrWAG9iQ_IqCubwgmjdIw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Geocode service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const { center, place_name } = body.features[0];

      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
