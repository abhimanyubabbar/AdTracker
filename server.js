// Main Express Application.
var express = require('express');
var path = require('path');
var app = express();


// MIDDLEWARE.
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, resp){
    resp.render('index');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Ad Tracker Server Listening on: " + port);
});

module.exports  = app;