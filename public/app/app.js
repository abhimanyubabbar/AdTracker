/**
 * Main Application boot point.
 */

(function(){

    var app = angular.module('adTracker',['ngRoute','ui.bootstrap','angular-growl',"oitozero.ngSweetAlert"]);

    app.config(['$logProvider', '$routeProvider','growlProvider', function($logProvider, $routeProvider, growlProvider){

        $logProvider.debugEnabled(false);
        growlProvider.globalTimeToLive(4000);

        $routeProvider
            .when("/", {
                templateUrl:'app/templates/adLanding.html',
                controller:'AdController',
                controllerAs:'adController'
            })
            .when("/about",{
                templateUrl:'/app/templates/about.html'
            })
            .otherwise("/")
    }]);
}());