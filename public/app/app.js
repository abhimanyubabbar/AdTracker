(function(){

    var app = angular.module('ad-tracker',['ngRoute']);

    app.config(["$logProvider", "$routeProvider", function($logProvider, $routeProvider){
        $logProvider.debugEnabled(true);

        $routeProvider
            //.when("/", {
            //    templateUrl:'',
            //    controller:'',
            //    controllerAs:''
            //})
            .when("/about",{
                templateUrl:'/app/templates/about.html'
            })
            .otherwise("/")

    }]);

}());