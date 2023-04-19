import m from 'mithril';

import { auth } from "../models/auth.js";

let login = {
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
        return m("div.container-form.slide-in",
            m("nav.top-nav-back", [
                m("a.material-icons-outlined.back", { href: "#!/min-sida/" }, "arrow_back")
            ]),
            m("h1", {style: {float: "left"}}, "Logga in"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    auth.login();
                } }, [
                // m("label.input-label", "E-post"),
                m("input.input[type=email][required][placeholder=E-post]", {
                    oninput: function (event) {
                        auth.email = event.target.value;
                    },
                    value: auth.email
                }),
                // m("label.input-label", "Lösenord"),
                m("input.input[type=password][required][placeholder=Lösenord]", {
                    oninput: function (event) {
                        auth.password = event.target.value;
                    },
                    value: auth.password
                }),
                m("span.buttons", [
                    m("input.button[type=submit][value=Logga in].button", "Logga in")
                ])
            ]));
    }
};

export { login };
