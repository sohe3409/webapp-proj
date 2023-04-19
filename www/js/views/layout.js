"use strict";

import m from "mithril";

var layout = {
    links: [
        { name: "Hem", icon: "home", route: "#!/" },
        { name: "Min sida", icon: "person_outline", route: "#!/min-sida" },
        { name: "Trafikinfo", icon: "railway_alert", route: "#!/forseningar" },
        { name: "Karta", icon: "map", route: "#!/karta" }
    ],
    view: function(vnode) {
        var topNav = vnode.attrs.topNav;
        var bottomNav = vnode.attrs.bottomNav;

        // if (auth.token && layout.links.length < 5) {
        //     layout.links.push({ name: "Fakturor", icon: "payment", route: "#!/invoices" });
        // }

        return [
            m("main.container", vnode.children),
            m("nav.bottom-nav", layout.links.map(function(link) {
                return m("a", {
                    href: link.route,
                    class: bottomNav === link.route ? "active" : null}, [
                    m("i.material-icons-outlined", link.icon),
                    m("span", link.name)
                ]);
            }))
        ];
    }
};

export { layout };
