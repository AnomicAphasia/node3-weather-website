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
        temperature,
        feelslike,
        precip,
        weather_descriptions: description,
        humidity,
        cloudcover,
        uv_index,
        visibility,
      } = body.current;
      callback(
        undefined,
        `Current temperature: ${temperature} degrees. It feels like ${feelslike} degrees. Amount of precipitation today is ${precip}. it is ${description[0].toLowerCase()} out. The humidity is ${humidity}. UV index is ${
          uv_index > 5 ? 'high' : 'low'
        }.`
      );
    }
  });
};

module.exports = forecast;
