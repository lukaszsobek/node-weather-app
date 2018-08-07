const request = require("request");
require("dotenv").config();

const getWeather = (location, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}/${location.lat},${location.lng}`;

    request({
        url,
        json: true
    }, (err, response, body) => {
        //callback(null, location);
        console.log(err, body.currently);
    });
}

module.exports = {
    getWeather
}