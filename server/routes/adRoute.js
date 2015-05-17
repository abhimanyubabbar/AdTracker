var express = require('express');
var router =  express.Router();
var adDataFile = 'server/data/ads.json';
var fs = require('fs');
var Ad = require('../model/adModel');

/**
 * The function simply wipes the already present collection clean and
 * load the test data in the system.
 *
 */
(function (){

    Ad.remove({}, function(err){
        if(err){
            console.log('Unable to remove collection');
        }
        else{

            console.log('Previous Present Collection Removed ... ');
            console.log('Added Test Collection ... ');

            addTestData();
        }
    });
}());


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


function addTestData(){

    var testArray = getAdJSONData();
    var ad;
    for(var i= 0, len= testArray.length ; i < len ; i ++){

        var currentObj = testArray[i];

        ad = new Ad();
        ad['name'] = currentObj['name'];
        ad['campaignName'] = currentObj['campaignName'];
        ad['picture'] = currentObj['picture'];
        ad['isActive'] = currentObj['isActive'];
        ad['impressions'] = currentObj['impressions'];
        ad['spend'] = currentObj['spend'];
        ad['description'] = currentObj['description'];
        ad['created'] = new Date(currentObj['created']);

        ad.save(function(err){
            if(err){
                console.log("Unable to add test data");
            }
        })
    }
}

function getAdJSONData(){
    return JSON.parse(getAdData());
}

function getAdData(){
    return fs.readFileSync(adDataFile);
}

module.exports = router;