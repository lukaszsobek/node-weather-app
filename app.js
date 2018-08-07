"use strict"

const yargs = require("yargs");
const geocode = require("./geocode/googleMaps")

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

geocode.getLocation(argv.a);
