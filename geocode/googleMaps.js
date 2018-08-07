const request = require("request");
require("dotenv").config();

const getLocation = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
     + `&key=${process.env.GOOGLE_APIKEY}`;
    
    request({
        url,
        json: true
    }, (err,response, body) => {
        if(err) {
            return callback({
                type: "NO_CONNECTION",
                msg: "Unable to connect to geolocation server"
            }, null);
        }
        if (body.status === "ZERO_RESULTS") {
            return callback({
                type: "ZERO_RESULTS",
                msg: "No results found"
            }, null);
        }
        
        const location = body.results[0].geometry.location;
        location.address = address;
        return callback(null, location);
    });
}

module.exports = {
    getLocation
}