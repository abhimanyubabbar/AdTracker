/**
 * Controller for the Header Section.
 */
(function(){


    angular.module('adTracker')
        .controller('HeaderController',['$log','$modal','$route','dataService', HeaderController]);


    function HeaderController($log, $modal, $route, dataService){

        $log.debug("Header Controller Initialized. ");

        var self = this;

        self.addAd = function(){

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
                $route.reload(); // Ideally should not reload but push to the array.
                // Will be done when we switch this functionality to the main controller.
            }


            function newAdFailure(){
                $log.error(" Unable to add new ad");
            }

        }
    }




}());