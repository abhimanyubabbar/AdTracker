/**
 * Controller for the Header Section.
 */
(function(){


    angular.module('adTracker')
        .controller('HeaderController',['$log','$modal','$route','dataService', HeaderController]);


    function HeaderController($log, $modal, $route, dataService){

        $log.debug("Header Controller Initialized. ");

        var self = this;
    }




}());