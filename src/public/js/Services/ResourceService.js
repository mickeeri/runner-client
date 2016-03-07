'use strict';
/*global angular*/
/*global ResourceService*/

angular.module("raceApp").
    factory('ResourceService', ResourceService);
   
// We inject the http (for AJAX-handling) and the API
ResourceService.$inject = ['$http', 'API'];

function ResourceService($http, API) {
    
    return function (collectionName) {
        
        // Creates Resource-object that is filled with data
        var Resource = function(data) {
            // Configures the object according to data. 
            angular.extend(this, data);
        }
        
        Resource.getCollection = function() {
            // Ordinaiery http-call
            var req = {
                method: 'GET',
                url: API.url +collectionName, // this is the entry point in my example
                headers: {
                    'Accept': API.format
                },
                params: {
                    'limit': '20',
                    'Api_key' : API.key
                }
            };
            
            // This returns a promise which will be fullfilled when the response is back
            return $http(req).then(function(response) {
              
              var result = [];
              // Building up an array with resource objects that will be returned
              angular.forEach(response.data, function(value, key) {
                result[key] = new Resource(value); 
              });
              // This is return when we get data
              return result;
            });
        }
    }
}

