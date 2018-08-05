"use strict"

const request = require("request");
require('dotenv').config()

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=marsza%C5%82kowska%2030%20warszawa"
+ `&key=${process.env.APIKEY}`;


request({
    url,
    json: true
}, (err,response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});