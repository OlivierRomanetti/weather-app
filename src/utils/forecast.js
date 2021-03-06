const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/6d71550c8ec3435d389932c363d5474e/${longitude},${latitude}?lang=fr`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      console.log('body:', body.currently);
      const {
        temperature,
        precipProbability,
        windSpeed,
        uvIndex,
      } = body.currently;
      callback(
        undefined,
        `${body.daily.data[0].summary}. 
        It is currently ${temperature} degrees out.
        There is a ${precipProbability}% chance of rain. 
        The wind speed is ${windSpeed} km/h and the uvIndex is ${uvIndex}.
        Have a good day!`
      );
    }
  });
};

module.exports = forecast;
