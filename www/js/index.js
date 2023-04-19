"use strict";

import m from "mithril";

import { auth } from "./models/auth.js";

import { layout } from "./views/layout";
import { home } from "./views/home";
import { homeDelays } from "./views/homeDelays.js";
import { viewDelays } from "./views/viewDelays.js";
import { viewMap } from "./views/viewMap.js";
import { login } from "./views/login";
import { homeLogin } from "./views/homeLogin";
import { register } from "./views/register.js";
import { myPage } from "./views/myPage.js";
import { viewFav } from "./views/viewFav.js";
import { addFav } from "./views/addFav.js";

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    m.route(document.body, "/", {
        "/": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/"
                }, m(home));
            }
        },
        "/forseningar": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/forseningar"
                }, m(homeDelays));
            }
        },
        "/forseningar/:id": {
            render: function(vnode) {
                return m(layout, {
                    bottomNav: "#!/forseningar"
                }, m(viewDelays, vnode.attrs));
            }
        },
        "/karta": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/karta"
                }, m(viewMap));
            }
        },
        "/logga-in-hem": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/min-sida"
                }, m(homeLogin));
            }
        },
        "/logga-in": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/min-sida"
                }, m(login));
            }
        },
        "/skapa-konto": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/min-sida"
                }, m(register));
            }
        },
        "/min-sida": {
            onmatch: function() {
                if (auth.token) {
                    return myPage;
                }
                return m.route.set("/logga-in-hem");
            },
            render: function(vnode) {
                if (auth.token) {
                    return m(layout, {
                        bottomNav: "#!/min-sida"
                    }, m(myPage));
                }
            }
        },
        "/favoriter": {
            onmatch: function() {
                if (auth.token) {
                    return viewFav;
                }
                return m.route.set("/logga-in-hem");
            },
            render: function(vnode) {
                if (auth.token) {
                    return m(layout, {
                        bottomNav: "#!/min-sida"
                    }, m(viewFav));
                }
            }
        },
        "/lagg-till-favorit": {
            onmatch: function() {
                if (auth.token) {
                    return addFav;
                }
                return m.route.set("/logga-in-hem");
            },
            render: function(vnode) {
                if (auth.token) {
                    return m(layout, {
                        bottomNav: "#!/min-sida"
                    }, m(addFav));
                }
            }
        },
    });
}
