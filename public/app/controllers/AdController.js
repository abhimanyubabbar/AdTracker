
(function(){


    angular.module('adtracker')
        .controller('AdController', ['$log', AdController]);


    /**
     * All the tracking of the ads is done in the
     * controller.
     *
     * @param $log
     * @constructor
     */
    function AdController($log){
        $log.debug("Ad Landing Controller Initialized");
    }

}());