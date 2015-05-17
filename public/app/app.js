/**
 * Main Application boot point.
 */

(function(){

    var app = angular.module('adTracker',['ngRoute','ui.bootstrap','angular-growl']);

    app.config(['$logProvider', '$routeProvider','growlProvider', function($logProvider, $routeProvider, growlProvider){

        $logProvider.debugEnabled(true);
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