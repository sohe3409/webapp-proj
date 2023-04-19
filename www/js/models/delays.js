"use strict";

import {baseUrl} from "../vars.js";
import m from 'mithril';
import { stations } from "./stations.js";

let delays = {
    url: `${baseUrl}delayed`,
    currentDelays: [],
    currentIntensity: [],
    currentDelays: [],
    currentCities: [],
    current: {},
    resetDelays: function() {
        delays.current = {};
    },
    load: function() {
        delays.currentDelays = [];
        return m.request({
            method: "GET",
            url: delays.url
        })
            .then(function(result) {
                delays.currentDelays = result.data.filter(function(delay){
                    return delay.FromLocation
                });
            });
    },
    loadCity: function() {
        delays.currentDelays = [];
        return m.request({
            method: "GET",
            url: delays.url
        })
            .then(function(result) {
                result.data.map(function(delay) {
                    if (delay.FromLocation) {
                        if (delays.currentDelays.includes(delay.FromLocation["0"]["LocationName"]) === false) delays.currentDelays.push(delay.FromLocation["0"]["LocationName"]);
                    }
                });
            });
    },
    loadIntensity: function() {
        delays.currentIntensity = [];
        return m.request({
            method: "GET",
            url: delays.url
        })
            .then(function(result) {
                result.data.map(function(delay) {
                    if (delay.FromLocation) {
                        if (delays.currentIntensity.includes(delay.FromStation["0"]["Geometry"]["WGS84"].slice(7, -1).split(" ", 2)) === false) {
                            delays.currentIntensity.push(delay.FromStation["0"]["Geometry"]["WGS84"].slice(7, -1).split(" ", 2));
                        }
                    }
                });
                console.log(delays.currentIntensity);
            });
    },

    loadFrom: function(id) {
        delays.currentDelays = [];
        return m.request({
            method: "GET",
            url: delays.url
        })
            .then(function(result) {
                delays.currentDelays = result.data.filter(function(delay) {
                    return (delay.FromLocation && delay.FromLocation["0"]["LocationName"] == id)
                });
            });
    },
    addStation: function() {
        delays.currentDelays.map(function(delay) {
            stations.currentStations.map(function(station) {
                if (delay.FromLocation["0"]["LocationName"] == station.LocationSignature) {
                  delay.FromStation = [station];
                }
                if (delay.ToLocation["0"]["LocationName"] == station.LocationSignature) {
                  delay.ToStation = [station];
                }
            })
        })
    },
    addStationCity: function() {
        delays.currentCities = [];
        delays.currentDelays.sort();
        delays.currentDelays.map(function(delay) {
            stations.currentStations.map(function(station) {
                if (delay == station.LocationSignature) {
                  delays.currentCities.push([delay, station.AdvertisedLocationName]);
                }
            })
        })
    }
};

export { delays };
