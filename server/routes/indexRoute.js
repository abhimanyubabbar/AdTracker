// Main Route For Rendering the Intial HTML.

var express = require('express');
var router = express.Router();

router.get('/', function(req, resp){
   resp.render('index');
});

module.exports = router;
