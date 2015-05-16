// Main Express Application.
var express = require('express');
var path = require('path');
var fs = require('fs');
var adDataFile = './server/data/ads.json';

var app = express();


// MIDDLEWARE.
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, resp){
    resp.render('index');
});

app.get("/ads", function(req, resp){
   resp.json(getAdData());
});

function getAdData(){
    var data = fs.readFileSync(adDataFile);
    return JSON.parse(data);
}


// PORT DEFINITION AND APP LISTENING.
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Ad Tracker Server Listening on: " + port);
});

module.exports  = app;