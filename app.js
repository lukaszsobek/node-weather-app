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

maps.getLocation(argv.a)
    .then(location => weather.getWeather(location))
    .then(weatherData => console.log(weatherData))
    .catch(err => console.log(`Error: ${err.type} - ${err.msg}`));
