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
    })
    .post(function(req, resp){

        var ad  = new Ad();
        var reqBody = req.body;

        ad['name'] = reqBody['name'];
        ad['campaignName'] = reqBody['campaignName'];
        ad['picture'] = reqBody['picture'];
        ad['isActive'] = reqBody['isActive'];
        ad['impressions'] = parseInt(getRandomValue(0,10000));
        ad['spend'] = getRandomValue(0, 1000).toFixed(2);
        ad['description'] = reqBody['description'];
        ad['created'] = Date.now();

        ad.save(function(err){

            if(err){
                resp.status(500).send("Unable to add new ad(s). Try later ... ");
            }

            resp.status(201).json(ad);
        })

    });



// PARAMETRIZED ROUTE

router.route("/:id")

    .get(function(req, resp){

        Ad.findById(req.params.id, function(err, data){

            if(err){
                resp.status(404)
                    .send("Unable to locate resource");
            }
            else{
                resp.json(data);
            }
        })
    })

    .put(function(req, resp){

        Ad.findById(req.params.id, function(err, data){

            if(err){
                resp.status(404)
                    .send("Unable to Locate Resource to Update");
            }

            data.description = req.body.description;
            data.isActive = req.body.isActive;

            data.save(function(err){

                if(err){
                    resp.status(500)
                        .send("Unable to update the resource");
                }

                resp.json(data);
            })

        })
    })

    .delete(function(req, resp) {

        Ad.findByIdAndRemove(req.params.id, function(err){

            if(err){
                resp.send(err);
            }

            resp.status(204)
                .send("Successfully removed the ad(s) from the store.");
        })
    });


// HELPER FUNCTIONS.

function getRandomValue(min, max){

    if(min >= max){
        return min;
    }

    return (Math.random()*(max - min) + min);
}


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