angular
  .module('raceApp')
  .controller('RaceDetailsCtrl', RaceDetailsCtrl);

RaceDetailsCtrl.$inject = ['$scope', '$location', '$routeParams', 'Restangular', 'AuthService']

function RaceDetailsCtrl($scope, $location, $routeParams, Restangular, AuthService) {
  var vm = this;
  var map = new L.map('map');
  getRace();

  function getRace(){
    // Get one race with restangular.
    Restangular.one('races', $routeParams.id).get().then(function(result){
      // Converting to datetime object.
      result.date = new Date(result.date);
      result.tag_list = result.tag_list.join(', ');
      generateMap(result.longitude, result.latitude);
      $scope.race = result;
    }, function(response) {
      console.log(response);
    });
  }

  // Generating map with leaflet plugin.
  function generateMap(longitude, latitude) {
    if (longitude && latitude) {
      map.setView([latitude, longitude], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map)
    }
  }

  // True if user wants to edit race.
  $scope.wantsToEdit = false;

  var authHeaderValue = 'Bearer '+AuthService.getAuthToken();

  // Toogle if user wants to edit or not.
  $scope.switchWantsToEdit = function() {
    if ($scope.wantsToEdit === false) {
      $scope.wantsToEdit = true;
    } else {
      // If aborted edit. Get the original race again.
      $scope.wantsToEdit = false;
      getRace();
    }
  }

  $scope.edit = function() {
    $scope.race.put(undefined, {'Authorization': authHeaderValue}).then(function(result) {
      $scope.wantsToEdit = false;
      $scope.successTextAlert = "Lopp uppdaterat!";
      $scope.showSuccessAlert = true;
      // Re-generate map.
      generateMap(result.longitude, result.latitude);
    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.errorTextAlert = response.data.user_message;
      } else {
        $scope.errorTextAlert = "Ett fel uppstod när loppet skulle uppdateras.";
      }
      $scope.wantsToEdit = false;
      $scope.showErrorAlert = true;
    });
  }

  $scope.delete = function() {
    $scope.race.remove('', {'Authorization': authHeaderValue}).then(function(result) {
      $scope.successTextAlert = "Lopp raderat!";
      $scope.showSuccessAlert = true;
      $location.path('/');

    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.errorTextAlert = response.data.user_message;
      } else {
        $scope.errorTextAlert = "Ett fel uppstod när loppet skulle raderas.";
      }
      $scope.showErrorAlert = true;
    });
  }
}
