const request = require("request");
require("dotenv").config();

const getWeather = (location, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}/${location.lat},${location.lng}?units=si`;

    return new Promise((resolve,reject) => {
        request({
            url,
            json: true
        }, (err, response, body) => {
            if(err) {
                reject({
                    type: "NO_CONNECTION",
                    msg: "Unable to connect to geolocation server"
                });
            }
            if (response.statusCode !== 200) {
                reject({
                    type: "BAD_REQUEST",
                    msg: "The request returned no results"
                });
            }

            const reply = `
            The weather in ${location.address} now:
            ${body.currently.summary} day, ${body.currently.temperature}°C
            `;
            resolve(reply);
        });
    })
}

module.exports = {
    getWeather
}