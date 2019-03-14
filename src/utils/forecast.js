const request = require("request");

const forecast = (lng, lat, callback) => {
  const API_KEY = "b2430186647bbdeede40051cba3c45d5";

  const url = `https://api.darksky.net/forecast/${API_KEY}/${lng},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const summary = body.daily.data[0].summary;
      const temperature = body.currently.temperature;
      const rain = body.currently.precipProbability;

      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${rain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
