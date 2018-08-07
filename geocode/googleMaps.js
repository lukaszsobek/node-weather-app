const request = require("request");
require('dotenv').config();

const getLocation = address => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
     + `&key=${process.env.APIKEY}`;
    
    request({
        url,
        json: true
    }, (err,response, body) => {
        if(err) {
            return console.log("Unable to connect to geolocation server");
        }
        if (body.status === "ZERO_RESULTS") {
            return console.log("No results found");
        }
        
        console.log(body.results[0].geometry.location)
    });
}

module.exports = {
    getLocation
}