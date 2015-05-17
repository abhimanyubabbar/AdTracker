/**
 * Main Ad Addition Controller.
 */
(function(){


    angular.module('adTracker')
        .controller('AddAdController', ['$log', '$modalInstance', AddAdController]);



    function AddAdController($log, $modalInstance){

        $log.debug("Add Ad Controller Initialized");
        var self = this;


        self.newAd = {

            name: '',
            campaignName:'',
            isActive: false,
            description: '',
            picture: ''
        };

        self.close = function(){
            $modalInstance.close();
        };

        self.addNewAd = function(){
            $log.debug('Call to add new ad invoked');
            $log.debug("New Ad : " + angular.toJson(self.newAd));
            $modalInstance.close(self.newAd);
        }
    }

}());

