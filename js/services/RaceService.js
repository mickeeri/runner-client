angular
  .module('raceApp')
  .factory('RaceService', RaceService);

  RaceService.$inject = ['Restangular', 'localStorageService'];

  function RaceService (Restangular, localStorageService) {

    var Resource = function(data) {
      angular.extend(this, data);
    }

    Resource.getCollection = function() {
      return Restangular.all('races');
    }
   }
