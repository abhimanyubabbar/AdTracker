(function(){

    var app = angular.module('ad-tracker',['ngRoute']);

    app.config(["$logProvider", "$routeProvider", function($logProvider, $routeProvider){
        $logProvider.debugEnabled(true);
    }]);

}());