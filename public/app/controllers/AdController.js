
(function(){


    angular.module('adTracker')
        .controller('AdController', ['$log','$route','$modal', 'dataService','growl', AdController]);


    /**
     * All the tracking of the ads is done in the
     * controller.
     *
     * @param $log
     * @param $route
     * @param $modal
     * @param dataService
     * @param growl
     *
     */
    function AdController($log, $route,$modal, dataService, growl){

        $log.debug("Ad Landing Controller Initialized");

        var self = this;

        dataService.getAllAds()
            .then(getDataSuccess)
            .catch(getDataError);


        self.addNewAd = function(){

            var modalInstance = $modal.open({

                templateUrl: 'app/templates/addAd.html',
                controller: 'AddAdController',
                controllerAs: 'addAdController',
                backdrop: 'static'
            });

            modalInstance.result.then(function(info){
                if(info){

                    $log.debug("Adding a new ad");
                    $log.debug("New Ad Info" + info);


                    dataService.newAd(info)
                        .then(newAdSuccess)
                        .catch(newAdFailure);

                }
            });


            function newAdSuccess(data){

                $log.info(data);
                self.ads.push(data);
                growl.success('Added a new Advertisement !')
            }


            function newAdFailure(){
                $log.error(" Unable to add new ad");
                growl.warning('Unable to add New Advertisement ! ');
            }

        };


        self.deleteAd = function(id){
            $log.debug("Function To delete the Ad Invoked: " + id);
            dataService.removeAd(id)
                .then(removeAdSuccess)
                .catch(getDataError);
        };



        self.updateAd = function(ad){

            var modalInstance = $modal.open({

                templateUrl: 'app/templates/editAd.html',
                controller: 'EditAdController',
                controllerAs: 'editAdController',
                backdrop: 'static',
                resolve: {
                    ad: function(){
                        return ad;
                    }
                }
            });

            modalInstance.result.then(function(info){
                if(info){

                    $log.debug(" Sending the request to update the ad.");
                    dataService.editAd(ad._id, info)
                        .then(editAdSuccess)
                        .catch(editAdError);
                }
            });


            function editAdSuccess (data){

                $log.debug(data);

                var selfAds = self.ads;
                for(var i= 0, len= selfAds.length; i< len; i++){

                    if(selfAds[i]['_id'] === data['_id']){
                        selfAds.splice(i, 1, data);
                        break;
                    }
                }

                growl.success('Successfully Edited the Advertisement !');

            }

            function editAdError(reason){
                $log.error(reason); // growl notification.
                growl.error('Editing of the advertisement failed !');
            }
        };


        function removeAdSuccess(){
            $log.debug(" Ad(s) Successfully Removed. ");
            $route.reload();
        }

        function getDataSuccess(data){

            self.ads = data;
            $log.debug("Successfully Fetched the ad(s).");
            growl.success("Successfully loaded advertisement(s).");
        }

        function getDataError(reason){
            $log.debug(reason);     // growl functionality.
            growl.error('Oops ! Action could not be completed ! ');
        }

    }

}());