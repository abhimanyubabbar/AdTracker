// Main Express Application.
var express = require('express');
var app = express();



app.get("/", function(req, resp){
    resp.send("Ad Tracker Basic Get");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Ad Tracker Server Listening on: " + port);
});

module.exports  = app;