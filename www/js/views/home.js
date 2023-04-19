"use strict";
import m from 'mithril';

let home = {
    view: function() {
        return m("main.container-home", [
            m("img", { src: "../../stt.png", style: {height: "50px", paddingBottom: "2em"}}),
            m("h1", {style: {fontSize: "3rem", marginBottom: "0"}}, "Välkommen!"),
            m("p", {style: {fontSize: "1.3rem", paddingBottom: "7em"}}, "Här visas händelser i tågtrafiken")
        ]);
    }
};

export { home };
