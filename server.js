// NPM modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express setup
var app = express();
var PORT = process.env.PORT || 3000;

// data parsing setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/app/public')));

// routing paths
require(path.join(__dirname, "./app/routing/apiRoutes.js"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes.js"))(app);

// listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
