"use strict";
import m from 'mithril';
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import locationIcon from "../../location.png";
import { position } from "../models/position.js";
import { delays } from "../models/delays.js";
import { stations } from "../models/stations.js";
import "../../leaflet-heat.js";

let map;
let geosearch;
let locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});


function showMap() {
    map = L.map('map').setView([59.8582, 17.6465], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    geosearch = new OpenStreetMapProvider();
}

function renderMarker() {
    delays.currentDelays.map(function(delay) {
        let yx = delay.FromStation["0"]["Geometry"]["WGS84"].slice(7, -1).split(" ", 2);
        let msg = delay.FromStation["0"]["AdvertisedLocationName"] + "\n" +
            (" Ny tid: " + delay.EstimatedTimeAtLocation.substring(11, 16) + " Tåg: " + delay.AdvertisedTrainIdent)
        L.marker([yx[1], yx[0]]).addTo(map).bindPopup(msg);
    });
}

function showPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [position.currentPosition.latitude, position.currentPosition.longitude],
            {icon: locationMarker}
        ).addTo(map).bindPopup("Din plats");
        map.setView([position.currentPosition.latitude, position.currentPosition.longitude]);
    }
}

let viewMap = {
    oninit: function(vnode) {
        delays.load();
        stations.load();
        position.getPosition();
    },
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            setTimeout(function() {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
    view: function() {
        delays.addStation();
        showPosition();
        if (delays.currentDelays) {
            renderMarker();
        }
        return m("main.container-delays.slide-in", [
            m("div#map.map", "")
        ]);
    },
    oncreate: showMap,
    // onremove: function() {
    //     ordersModel.currentAddress = "";
    // }
};

export { viewMap };
