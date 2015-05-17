
(function(){


    angular.module('adtracker')
        .controller('AdController', ['$log', 'dataService', AdController]);


    /**
     * All the tracking of the ads is done in the
     * controller.
     *
     * @param $log
     * @constructor
     * @param dataService
     */
    function AdController($log, dataService){

        $log.debug("Ad Landing Controller Initialized");

        var self = this;

        dataService.getAllAds()
            .then(getDataSuccess)
            .catch(getDataError);


        function getDataSuccess(data){
            $log.debug("Successfully Fetched the ad(s).");
            self.ads = data;
            console.log(self.ads);
        }

        function getDataError(reason){
            $log.debug(reason);
        }

    }

}());