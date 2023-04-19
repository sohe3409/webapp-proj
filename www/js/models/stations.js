"use strict";

import {baseUrl} from "../vars.js";
import m from 'mithril';
import { auth } from "./auth.js";

let stations = {
    url: `${baseUrl}stations`,
    currentStations: [],
    currentCities: [],
    load: function() {
        return m.request({
            method: "GET",
            url: stations.url
        })
            .then(function(result) {
                stations.currentStations = result.data;
            });
    },
    loadCities: function() {
        stations.currentCities = [];
        return m.request({
            method: "GET",
            url: stations.url
        })
            .then(function(result) {
                result.data.map(function(station) {
                    if (stations.currentCities.includes(station.LocationSignature) === false) {
                        stations.currentCities.push([station.LocationSignature, station.AdvertisedLocationName]);
                    }
                })
            })
            .then(function() {
                auth.currentUser.map(function(fav) {
                    stations.currentCities = stations.currentCities.filter(function(station) {
                        return fav[0]["code"] != station[0]
                    })
                })
            })
    },
    current: {},
    resetStations: function() {
        stations.current = {};
    }
};

export { stations };
