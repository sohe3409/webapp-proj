"use strict";
import m from 'mithril';
import { stations } from "../models/stations.js";
import { auth } from "../models/auth.js";

let cityTable = {
    view: function() {
        return m("table.table-cities.table-striped.table-stacked", [
            m("thead", [
                m("tr", [
                    m("th", "Stationer"),
                ])
            ]),
            m("tbody", stations.currentCities.map(function(city) {
                return m("tr", [
                    m("td", {style: {alignItems: "center", display: "flex", justifyContent: "space-between"}}, [
                        m("p", city[1]),
                        m("i.material-icons", {
                            onclick: function() {
                                auth.current.artefact = JSON.stringify({"name": city[1], "code": city[0]})
                                auth.addArt();
                                return m.route.set("/favorier");
                            }
                        }, "star_outline")
                    ])
                ])
            }))
        ]);
    }
}

let addFav = {
    oninit: function() {
        stations.loadCities();
        if (auth.token) {
            auth.getData();
        }
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
        return m("main.container-delays.slide-in", [
            m("nav.top-nav-back", [
                m("a.material-icons-outlined.back", { href: "#!/min-sida/", style: {margin: "0.5em"}}, "arrow_back")
            ]),
            m(cityTable),
            m("br"),
            m("br"),
            m("br"),
        ]);
    }
};

export { addFav };
