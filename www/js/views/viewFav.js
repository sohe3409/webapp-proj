"use strict";
import m from 'mithril';
import { delays } from "../models/delays.js";
import { stations } from "../models/stations.js";
import { auth } from "../models/auth.js";

let favTable = {
    view: function() {
        return m("table.table-cities.table-striped.table-stacked", [
            m("thead", [
                m("tr", [
                    m("th", "Favoriter"),
                ])
            ]),
            m("tbody", auth.currentUser.map(function(fav) {
                return m("tr", [
                    m("td", {style: {alignItems: "center"}}, [
                        m("i.material-icons.start", {style: {fontSize: "1rem"}}, "star"),
                        m("i", {style: {fontStyle: "normal", paddingLeft: "5px"}}, fav[0]["name"]),
                        m("i.material-icons", {style: {float: "right"},
                            onclick: function() {
                                auth.current.id = fav[1];
                                auth.delArt();
                                return m.route.set("/favorier");
                            }
                        }, "remove")
                    ])
                ])
            }))
        ]);
    }
}

let noToken = {
    view: function() {
        return m("p", "Logga in eller bli medlem för att spara favoriter.");
    }
};

let viewFav = {
    oninit: function() {
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
                m("a.material-icons-outlined.back", { href: "#!/min-sida/" , style: {margin: "0.5em"}}, "arrow_back")
            ]),
            auth.currentUser.length > 0 ? m(favTable) : m(noToken),
            m("br"),
            m("br"),
            m("br"),
        ]);
    }
};

export { viewFav };
