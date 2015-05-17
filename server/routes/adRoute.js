var express = require('express');
var router =  express.Router();
var adDataFile = './server/data/ads.json';
var fs = require('fs');

router.route("/")

    .get(function(req,res){
        res.json(getAdData());
    });


function getAdData(){
    var data = fs.readFileSync(adDataFile);
    return JSON.parse(data);
}

module.exports = router;