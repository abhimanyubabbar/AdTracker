/**
 * Editing the already added ads.
 * We can edit the <b>Active</b> and the <b>Description</b> fields for now.
 * Rest fields shall remain constant for the ad.
 *
 */
(function(){


    angular.module('adTracker')
        .controller('EditAdController', ['$log','$modalInstance','ad', EditAdController]);


    function EditAdController($log, $modalInstance, ad){

        $log.debug('Edit Ad Controller Initialized');
        var self = this;

        self.selfAdObj = {

            name : ad.name || '',
            campaignName: ad['campaignName'] || '',
            isActive: ad['isActive'] || false,
            picture: ad['picture'] || '',
            description: ad['description'] || 'description',
            created : ad['created'] || Date.now(),
            spend : ad['spend'] || 0,
            impressions : ad['impressions'] || 0
        };


        self.close = function(){
            $modalInstance.close();
        };

        self.updateAd = function(){
            $log.debug('Method to update ad called');
            $log.debug(angular.toJson(self.selfAdObj));


            $modalInstance.close(self.selfAdObj);
        }
    }

}());