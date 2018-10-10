"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import controllers
const index_1 = require("./controller/Test/index");
const express = require("express");
// Assign app object
const app = express();
// Test Route ---- Hello is a function in the controller!
app.use("/", index_1.hello);
const port = 3000;
// Listen for requests
app.listen(port, () => {
    console.log("Listening at http://localhost:${port}/");
});
/*
// Imports
const userService = require("./object/user/user.js");
const loginRouterServicer = require("./router/login/loginRoute.js");
const message = require("./helpers/messageAndStatus.js");
const express = require("express");
const monk = require("monk");

// Framework setups
const app = express();
const db = monk("localhost/heavydb");

// Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Services
const loginService = new userService(db);

// Routes
const loginRouterService = new loginRouterServicer(app, loginService);

// "/"
app.get("/", (req, res) => {
    res.send("HeavyAgger REST API")
});

// Register new login route
loginRouterService.loginRoute();

// Register new user route
loginRouterService.registerRoute();

const port = 3005;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));

*/ 
