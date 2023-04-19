import m from 'mithril';
import {authUrl, apiKey} from "../vars.js";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZGUxY2VkYzlkMGRhYzJhODMzMmQwMzVlYzg5MzljMTgiLCJlbWFpbCI6InRlc3RAdGVzdC5zZSIsImlhdCI6MTYyMTMzMjA2NCwiZXhwIjoxNjIxNDE4NDY0fQ.giS3CBTDY5GHMW2FGpBKfzbSbdITV2q9kf7deBtshn0
const auth = {
    url: authUrl,
    email: "",
    password: "",
    currentUser: [],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZGUxY2VkYzlkMGRhYzJhODMzMmQwMzVlYzg5MzljMTgiLCJlbWFpbCI6InRlc3RAdGVzdC5zZSIsImlhdCI6MTYyMjE0NzA0OSwiZXhwIjoxNjIyMjMzNDQ5fQ.-SgjlcFu0q-wc6IVicqSID7FC_AeD51AAY7JzsI9WEo",
    login: function() {
        m.request({
            method: "POST",
            url: `${auth.url}login`,
            body: {
                api_key: apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";

            console.log(result.data.token);

            auth.token = result.data.token;

            return m.route.set("/min-sida");
        });
    },
    register: function() {
        m.request({
            method: "POST",
            url: `${auth.url}register`,
            body: {
                api_key: apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";
            console.log(result.data.token);
            return m.route.set("/min-sida");
        });
    },
    getData: function() {
        auth.currentUser = [];
        return m.request({
            method: "GET",
            url: `${auth.url}data?api_key=${apiKey}`,
            headers: {
                "x-access-token": auth.token
            }
        }).then(function(result) {
            result.data.map(function(fav) {
                console.log(fav);
                auth.currentUser.push([JSON.parse(fav["artefact"]), fav["id"]])
            });
        });
    },
    addArt: function() {
        auth.current.api_key = apiKey;
        return m.request({
            method: "POST",
            url: `${auth.url}data`,
            body: auth.current,
            headers: {
                "x-access-token": auth.token
            }
        })
            .then(function(result) {
                auth.resetCurrent();
                return m.route.set("/min-sida");
            });
    },
    delArt: function() {
        auth.current.api_key = apiKey;
        return m.request({
            method: "DELETE",
            url: `${auth.url}data`,
            body: auth.current,
            headers: {
                "x-access-token": auth.token
            }
        })
            .then(function(result) {
                auth.resetCurrent();
                return m.route.set("/favoriter")
            });
    },
    resetCurrent: function() {
        auth.current = {}
    },
    current: {}
};
export { auth };
