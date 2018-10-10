// Import everything from Express
import Application from 'express';

// Import controllers
import { hello } from './controller/Test/index';

const express = require("express");

// Assign app object
const app = express();

// Test Route ---- Hello is a function in the controller!
app.use("/", hello);

const port : number = 3000;


// Listen for requests
app.listen(port, () => {
    console.log("Listening at http://localhost:${port}/")
});