// MAIN DEPENDENCIES.
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/adTrackerTest');
console.log('Connection Successful to Database');

// ROUTES DEPENDENCY.
var indexRouter = require("./server/routes/indexRoute.js");
var adRouter = require('./server/routes/adRoute.js');

// MAIN APPLICATION.
var app = express();

// MIDDLEWARE.
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/ads', adRouter);


// PORT DEFINITION AND APP LISTENING.
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Ad Tracker Server Listening on: " + port);
});

module.exports  = app;