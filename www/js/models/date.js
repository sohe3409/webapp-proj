"use strict";

import m from "mithril";

let todaysDate = {
    month: Array(" januari "," februari "," mars "," april "," maj "," juni "," juli "," augusti "," september "," oktober"," november "," december "),
    date: "",
    getDate: function() {
        let today = new Date();
        todaysDate.date = " Idag " + today.getDate() + " " + todaysDate.month[today.getMonth()];
    }
};

export { todaysDate };
