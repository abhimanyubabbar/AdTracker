/**
 * Created by babbarshaer on 2015-05-16.
 */

(function(){


    angular.module('adtracker')
        .factory('dataService', ['$log', '$http','$q', dataService]);


    /**
     * Main Service used by the application
     * to communicate with the server.
     *
     * @param $log
     * @param $http
     * @param $q
     * @returns {{Interface For Services Exposed}}
     */
    function dataService($log,$http, $q){

        return{
            getAllAds: getAllAds
        };

        function getAllAds(){

            return $http({
                method: 'GET',
                url: 'api/ads'
            })
                .then(sendDataGETSuccess)
                .catch(sendDataGETError);
        }


        function sendDataGETSuccess(response){
            $log.debug("Received HTTP Response from the server");
            return response.data;
        }

        function sendDataGETError(response){
            $log.error("Received error from Server.");
            return $q.defer("Call To GET data failed with HTTP Status: " + response.status);
        }

    }




}());