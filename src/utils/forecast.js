const request = require('request');

const apiKey = 'c20a930e567635606203b5a1fd94b1b2';

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lng},${lat}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Can't reach service.`);
    } else if (body.error) {
      callback('Invalid Coordinates.');
    } else {
      const {
        temperature: currently,
        feelslike,
        precip,
        weather_descriptions: description,
      } = body.current;
      callback(undefined, {
        currently,
        feelslike,
        precip,
        description: description[0].toLowerCase(),
      });
    }
  });
};

module.exports = forecast;
