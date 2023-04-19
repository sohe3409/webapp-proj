import m from 'mithril';

import { auth } from "../models/auth.js";

let homeLogin = {
    view: function() {
        return m("div.container-login", [
            m("div.flex-container", [
                m("div.icon-back",{style: {marginBottom: "1.5em"}}, m("i.material-icons-outlined.big-icon", "person_outline")),
            ]),
            m("h1", {style: {fontSize: "3rem", marginBottom: "0"}},"Min sida"),
            m("p", {style: {fontSize: "1.3rem", marginBottom: "4em"}},"Gör det smidigare genom att logga in."),
            m("span.buttons", [
                m("a.button", {href: "#!/logga-in"}, "Logga in"),
                m("a.button-two", {href: "#!/skapa-konto"}, "Bli medlem i STT Prio"),
            ])
        ]);
    }
};

export { homeLogin };
