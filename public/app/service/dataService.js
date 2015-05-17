/**
 * Created by babbarshaer on 2015-05-16.
 */

(function(){


    angular.module('adTracker')
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
            getAllAds: getAllAds,
            removeAd : removeAd,
            editAd: editAd,
            newAd: newAd
        };

        function getAllAds(){

            return $http({
                method: 'GET',
                url: 'api/ads'
            })
                .then(httpSuccess)
                .catch(httpError);
        }


        function removeAd(id){

            return $http({
                method:'DELETE',
                url: 'api/ads/' + id
            })

                .then(removeDataSuccess)
                .catch(removeDataError);
        }


        function editAd(id){

            return $http({
                method: 'PUT',
                url: 'api/ads/'+id
            })
                .then(httpSuccess)
                .catch(httpError);
        }


        function newAd(ad){

            return $http({
                method:'POST',
                url: 'api/ads',
                data: ad
            })
                .then(httpSuccess)
                .catch(httpError);
        }


        function httpSuccess(response){
            $log.debug("Received Successful HTTP Response from the server");
            return response.data;
        }

        function httpError(response){
            $log.error("Received error from Server.");
            return $q.reject("Call To GET data failed with HTTP Status: " + response.status);
        }



        function sendDataGETSuccess(response){
            $log.debug("Received Successful HTTP Response from the server");
            return response.data;
        }

        function sendDataGETError(response){
            $log.error("Received error from Server.");
            return $q.reject("Call To GET data failed with HTTP Status: " + response.status);
        }


        function removeDataSuccess (response){
            return response.data;
        }


        function removeDataError(response){
            return $q.reject("Call to DELETE ad(s) failed with HTTP Status: " + response.status);
        }


    }




}());