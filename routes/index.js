/**
 * Created by mandeep on 6/13/17.
 */
var express = require("express");
var Router = express.Router();

Router.get("/", function (request, response) {
    response.render('index');
});

module.exports = Router;