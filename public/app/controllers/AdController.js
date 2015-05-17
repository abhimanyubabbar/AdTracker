
(function(){


    angular.module('adTracker')
        .controller('AdController', ['$log','$route','$modal', 'dataService', AdController]);


    /**
     * All the tracking of the ads is done in the
     * controller.
     *
     * @param $log
     * @param $route
     * @param $modal
     * @param dataService
     * @constructor
     *
     */
    function AdController($log, $route,$modal, dataService){

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

            }

            function editAdError(reason){
                $log.error(reason); // growl notification.
            }
        };


        function removeAdSuccess(){

            $log.debug(" Ad(s) Successfully Removed. ");
            $route.reload();
        }

        function getDataSuccess(data){
            $log.debug("Successfully Fetched the ad(s).");
            self.ads = data;
            console.log(self.ads);
        }

        function getDataError(reason){
            $log.debug(reason);     // growl functionality.
        }

    }

}());