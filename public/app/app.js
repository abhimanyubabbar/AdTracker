/**
 * Main Application boot point.
 */

(function(){

    var app = angular.module('adTracker',['ngRoute','ui.bootstrap']);

    app.config(["$logProvider", "$routeProvider", function($logProvider, $routeProvider){
        $logProvider.debugEnabled(true);

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