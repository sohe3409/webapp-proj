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
import "leaflet.heat";

let map;
let geosearch;
let group;
let locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [20, 20],
    iconAnchor:   [10, 10],
    popupAnchor:  [0, 0]
});


function showMap() {
    map = L.map('map', {
        'zoom': 7,
        'layers': [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
              attribution: `&copy;
              <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors`
            })
        ]
    })

    group = new L.LayerGroup().addTo(map);
    geosearch = new OpenStreetMapProvider();
}

function renderMarker(heatArr) {
    let i = 0;
    delays.currentDelays.map(function(delay) {
        let yx = delay.FromStation["0"]["Geometry"]["WGS84"].slice(7, -1).split(" ", 2);
        let msg = getPop(delay);
        let marker = L.marker([yx[1], yx[0]]).addTo(map).bindPopup(msg);
        group.addLayer(marker);
        heatArr[i] = getIntensity(delay);
        i +=1;
    });
}

function getPop(city) {
    let msg = city.FromStation["0"]["AdvertisedLocationName"] + "<br>";
    delays.currentDelays.map(function(delay) {
        if (delay.FromLocation["0"]["LocationName"] == city.FromLocation["0"]["LocationName"]) {
          let msgO = (" Ny tid: " + delay.EstimatedTimeAtLocation.substring(11, 16) + " Tåg: " + delay.AdvertisedTrainIdent + "<br>");
          msg = msg + msgO;
        }
    });
    return msg;
}

function getIntensity(city) {
    let yx = city.FromStation["0"]["Geometry"]["WGS84"].slice(7, -1).split(" ", 2);
    let out = [yx[1], yx[0]];
    let amount = delays.currentDelays.length;
    let counter = 0;
    delays.currentDelays.map(function(delay) {
        if (delay.FromLocation["0"]["LocationName"] == city.FromLocation["0"]["LocationName"]) {
            counter += 1;
        }
    });
    out[2] = (counter / amount) * 10;
    return out;
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

function removeL() {
    map.removeLayer(group);
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
        let heatArr = [];
        delays.addStation();
        showPosition();
        if (delays.currentDelays) {
            renderMarker(heatArr);
        }
        return m("main.container-delays.slide-in", [
          m("nav.top-nav-back", [
            m("p.padd", {
              onclick: function() {
                  var heat = L.heatLayer(heatArr, {
                        radius: 35,
                        minOpacity: 0.4,
                        gradient: {0.5: 'blue', 0.6: 'lime', 1: 'red'}
                  }).addTo(map)
              }
            }, "Show Heat Map")
          ]),
            m("div#map.map", "")
        ]);
    },
    oncreate: showMap
};

export { viewMap };
