const express = require('express');
const jwt = require('jsonwebtoken');
const {saveUser, findByUsername} = require("../controllers/user_controller");
const config = require("../config/config");
const {to} = require("await-to-js");

let loginRoute = new express.Router();

loginRoute.post("/login", async function (req, res) {
    let password = req.body.password;
    let username = req.body.username;

    let [err, user] = await to(findByUsername(username));
    if (err) {
        next(err);
        return;
    }

    if (!user) {
        res.status(401).json({message: "no such user found"});
    }

    if (user.password === password) {
        let payload = {username: user.username};
        let token = jwt.sign(payload, config.jwt.pass);
        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message: "passwords did not match"});
    }
});

loginRoute.post("/signup", async function (req, res, next) {
    let password = req.body.password;
    let username = req.body.username;

    let [err, user] = await to(saveUser({username, password}));
    if (err) {
        next(err);
        return;
    }

    res.status(201).json(user);
});


module.exports = loginRoute;