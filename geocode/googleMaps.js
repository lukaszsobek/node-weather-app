const request = require("request");
require("dotenv").config();

const getLocation = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
     + `&key=${process.env.GOOGLE_APIKEY}`;

     return new Promise((resolve, reject) => {
        request({
            url,
            json: true
        }, (err,response, body) => {
            if(err) {
                return reject({
                    type: "NO_CONNECTION",
                    msg: "Unable to connect to geolocation server"
                });
            }
            if (body.status === "ZERO_RESULTS") {
                return reject({
                    type: "ZERO_RESULTS",
                    msg: "No results found"
                });
            }
            
            const location = body.results[0].geometry.location;
            location.address = address;
            return resolve(location);
        });
     })
    
   
}

module.exports = {
    getLocation
}