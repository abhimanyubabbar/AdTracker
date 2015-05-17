
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
            growl.success("Successfully Fetched the ad(s).");
        }

        function getDataError(reason){
            $log.debug(reason);     // growl functionality.
            growl.error('Oops ! Action could not be completed ! ');
        }

    }

}());