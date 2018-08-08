const request = require("request");
require("dotenv").config();

const getWeather = (location, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}/${location.lat},${location.lng}?units=si`;

    request({
        url,
        json: true
    }, (err, response, body) => {
        if(err) {
            return callback({
                type: "NO_CONNECTION",
                msg: "Unable to connect to geolocation server"
            }, null);
        }
        if (response.statusCode !== 200) {
            return callback({
                type: "BAD_REQUEST",
                msg: "The request returned no results"
            }, null);
        }

        const reply = `${body.currently.summary} day, ${body.currently.temperature}°C`;
        callback(err, reply);
    });
}

module.exports = {
    getWeather
}