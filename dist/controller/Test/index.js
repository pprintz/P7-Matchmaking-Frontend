"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import model functions
const testModel_1 = require("../../model/Test/testModel");
// Define hello function
function hello(req, res) {
    // Send response with message from model
    res.send(testModel_1.helloRetrieve("test message!"));
}
exports.hello = hello;
