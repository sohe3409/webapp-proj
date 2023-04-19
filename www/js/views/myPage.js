"use strict";
import m from 'mithril';

let myPage = {
    view: function() {
        return m("div.container-login", [
            m("div.flex-container", [
                m("div.icon-back", {style: {marginBottom: "1.5em"}}, m("i.material-icons-outlined.big-icon", "person_outline"))
            ]),
            m("h1", "Min sida"),
            m("p", {style: {fontSize: "1.2rem"}}, "Hantera dina favoriter nedan."),
            m("div.fav-links", [
                m("span", {style: {alignItems: "center", padding: "1em"}}, [
                    m("i.material-icons", "star"),
                    m("a", {href: "#!/favoriter"}, " Visa favoriter"),
                ]),
                m("span", {style: {alignItems: "center", padding: "1em"}}, [
                    m("i.material-icons", "star_outline"),
                    m("a", {href: "#!/lagg-till-favorit"}, " Lägg till favorit"),
                ]),

            ])
        ]);
    }
};

export { myPage };
