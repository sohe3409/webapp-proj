"use strict";
import m from 'mithril';
import { delays } from "../models/delays.js";
import { stations } from "../models/stations.js";
import { auth } from "../models/auth.js";

let delaysTable = {
    view: function() {
        return m("table.table-cities.table-striped.table-stacked", [
            m("thead", [
                m("tr", [
                    m("th", "Stationer"),
                ])
            ]),
            m("tbody", delays.currentCities.map(function(delay) {
                return m("tr", [
                    m("td", [
                        m("a", {href: "#!/forseningar/" + delay[0]}, delay[1])
                    ])
                ])
            }))
        ]);
    }
};

let favTable = {
    view: function() {
        let favDel = [];
         delays.currentCities.map(function(delay) {
            auth.currentUser.map(function(fav) {
                if (delay[0] == fav[0]["code"]) {
                    favDel.push(delay);
                }
            })
        })
        if (favDel.length > 0) {
            return m("table.table-cities.table-striped.table-stacked", [
                m("thead", [
                    m("tr", [
                        m("th", "Favoriter"),
                    ])
                ]),
                m("tbody", favDel.map(function(fav) {
                    return m("tr", [
                        m("td", {style: {alignItems: "center"}}, [
                            m("i.material-icons.start", {style: {fontSize: "1rem"}}, "star"),
                            m("a", {href: "#!/forseningar/" + fav[0], style: {paddingLeft: "5px"}}, fav[1])
                        ])
                    ])
                }))
            ]);
        }
    }
}

let noData = {
    view: function() {
        return m("p.message-two", "Inga förseningar i tågtrafiken.");
    }
};

let noToken = {
    view: function() {
        return m("p.message-two", "Logga in eller bli medlem för att spara favoriter.");
    }
};

let homeDelays = {
    oninit: function() {
        delays.loadCity();
        stations.load();
        if (auth.token) {
            auth.getData();
        }
    },
    view: function() {
        delays.addStationCity();
        return m("main.container-delays", [
            // m("nav.top-nav", [
            //   m("span", [
            //       m("a.material-icons-outlined.back", { href: "#!/forseningar/" }, "arrow_back")
            //       ])
            // ]),
            auth.currentUser.length > 0 ? m(favTable) : m(noToken),
            delays.currentDelays.length > 0 ? m(delaysTable) : m(noData),
            m("br"),
            m("br"),
            m("br"),
        ]);
    }
};

export { homeDelays };
