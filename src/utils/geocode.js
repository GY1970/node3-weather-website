const request = require("request");

const geocode = (address, callback) => {
  const MAPBOX_KEY =
    "pk.eyJ1IjoiZ3kxOTcwIiwiYSI6ImNqdDI3NDNtMDBncTQ0M3BoZncwcmlocnYifQ.MDit7nWZqBGg0YPrkzzE-Q";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_KEY}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
