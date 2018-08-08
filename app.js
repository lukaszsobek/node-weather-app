"use strict"

const yargs = require("yargs");
const maps = require("./geocode/googleMaps");
const weather = require("./geocode/darkSky");

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

maps.getLocation(argv.a, (err, location) => {
    if(err) {
        return console.log(`Error: ${err.type} - ${err.msg}`)
    }

    weather.getWeather(location, (weatherErr, weather) => {
        if(weatherErr) {
            return console.log(`Error: ${weatherErr.type} - ${weatherErr.msg}`)    
        }
        console.log(`
            The weather in ${location.address} now:
            ${weather}
        `);
    });
});
