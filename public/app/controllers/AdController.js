
(function(){


    angular.module('adTracker')
        .controller('AdController', ['$log','$route', 'dataService', AdController]);


    /**
     * All the tracking of the ads is done in the
     * controller.
     *
     * @param $log
     * @param $route
     * @param dataService
     * @constructor
     *
     */
    function AdController($log, $route, dataService){

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