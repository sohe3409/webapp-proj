"use strict";
import m from 'mithril';
import { delays } from "../models/delays.js";
import { stations } from "../models/stations.js";
import { todaysDate } from "../models/date.js";

let delaysTable = {
    view: function() {
        return m("table.table.table-striped.table-stacked", [
            m("thead", [
                m("tr", [
                    m("th.f", {style: {fontWeight: "normal"}}, "Tid"),
                    m("th.s", {style: {fontWeight: "normal"}}, "Till"),
                    m("th.t", {style: {fontWeight: "normal"}}, "Tåg"),
                ])
            ]),
            m("tbody", delays.currentDelays.map(function(delay) {
                return m("a.delay", {href: "#!/karta"}, [
                    m("tr", [
                        m("td.f", [
                              m("p.adv", delay.AdvertisedTimeAtLocation.substring(11, 16)),
                              m("p.est", delay.EstimatedTimeAtLocation.substring(11, 16))
                        ]),
                        m("td.s", {style: {fontSize: "1.3rem"}}, delay.ToStation["0"]["AdvertisedLocationName"]),
                        m("td.t", delay.AdvertisedTrainIdent)
                    ]),
                    m("hr.line")
                ])
            }))
        ]);
    }
};

let noData = {
    view: function() {
        return m("p.message", "Inga förseningar i tågtrafiken.");
    }
};

let topNav = {
    loadCity: function(vnode) {
        delays.currentCities.map(function(delay) {
            if (vnode.attrs.id == delay[0]) {
                topNav.city = delay[1]
            }
        })
    },
    city: "",
    view: function(vnode) {
        return m("nav.top-nav.slide-in", [
            m("span", [
                m("a.material-icons-outlined.back", { href: "#!/forseningar/" }, "arrow_back"),
                m("p.city", topNav.city),
                m("p.status", {style: {fontSize: "1.3rem"}},"Avgående"),
                m("span.date", {style: {fontSize: "1.3rem"}}, [
                    m("p.material-icons-outlined", {style: {fontSize: "1.5rem"}}, "date_range"),
                    m("p", todaysDate.date)
                ])
            ])
        ])
    }
};


let viewDelays = {
    oninit: function(vnode) {
        delays.loadFrom(vnode.attrs.id);
        stations.load();
        topNav.loadCity(vnode);
        todaysDate.getDate();
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
        return m("main.container-delays.slide-in", [
            m(topNav),
            delays.currentDelays.length > 0 ? m(delaysTable) : m(noData),
        ]);
    }
};

export { viewDelays };
