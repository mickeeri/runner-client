angular
  .module('raceApp')
  .controller('RaceDetailsCtrl', RaceDetailsCtrl);

RaceDetailsCtrl.$inject = ['$scope', '$location', '$routeParams', 'Restangular', 'AuthService']

function RaceDetailsCtrl($scope, $location, $routeParams, Restangular, AuthService) {
  $scope.$parent.resetMessages();
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
      // Show errors.
      if (response.data) {
        $scope.$parent.errorTextAlert = response.data.user_message;
      } else {
        $scope.$parent.errorTextAlert = "Fel uppstod när data skulle hämtas från servern.";
      }
      $scope.$parent.showErrorAlert = true;
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

  // Authorization-header that needs to be in every request.
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
    $scope.$parent.resetMessages();

    $scope.race.put(undefined, {'Authorization': authHeaderValue}).then(function(result) {
      $scope.wantsToEdit = false;
      $scope.$parent.successTextAlert = "Lopp uppdaterat!";
      $scope.$parent.showSuccessAlert = true;
      // Re-generate map.
      generateMap(result.longitude, result.latitude);
    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.$parent.errorTextAlert = response.data.user_message;
      } else {
        $scope.$parent.errorTextAlert = "Ett fel uppstod när loppet skulle uppdateras.";
      }
      $scope.wantsToEdit = true;
      $scope.$parent.showErrorAlert = true;
    });
  }

  $scope.delete = function() {
    $scope.$parent.resetMessages();

    $scope.race.remove('', {'Authorization': authHeaderValue}).then(function(result) {
      $scope.$parent.successTextAlert = "Lopp raderat!";
      $scope.$parent.showSuccessAlert = true;
      $scope.$parent.keepMessage = true;
      $location.path('/');
    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.$parent.errorTextAlert = response.data.user_message;
      } else {
        $scope.$parent.errorTextAlert = "Ett fel uppstod när loppet skulle raderas.";
      }
      $scope.$parent.showErrorAlert = true;
    });
  }

  // Check if logged in user is owner of resource.
  $scope.correctUser = function(owner) {
    return owner === AuthService.getCurrentUser();
  }
}
