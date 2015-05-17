var express = require('express');
var router =  express.Router();
var adDataFile = 'server/data/ads.json';
var fs = require('fs');
var Ad = require('../model/adModel');

// clean the collection before proceeding forward.

router.route("/")

    .get(function (req, resp){

        console.log(" Received GET Request");

        Ad.find(function(err, ads){

            if(err){
                console.log(err);
                return resp.status(500).send('Unable to locate ads');
            }

            resp.json(ads);
        });
    });



function getAdJSONData(){
    return JSON.parse(getAdData());
}

function getAdData(){
    return fs.readFileSync(adDataFile);
}

module.exports = router;