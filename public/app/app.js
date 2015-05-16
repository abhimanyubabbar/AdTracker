(function(){

    var app = angular.module('adtracker',['ngRoute']);

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