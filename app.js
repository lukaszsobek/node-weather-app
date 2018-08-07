"use strict"

const yargs = require("yargs");
const request = require("request");
require('dotenv').config()

const argv = yargs.options({
    a: {
        describe: "Address of the location to fetch weather data for",
        demand: true,
        alias: "address",
        string: true
    }
})
.help()
.alias("help", "h")
.argv;

const encodedAddress = encodeURIComponent(argv.a);
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
    
    const location = body.results[0].geometry.location
    console.log(location.lat, location.lng);
});