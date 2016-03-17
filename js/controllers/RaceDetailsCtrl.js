angular
  .module('raceApp')
  .controller('RaceDetailsCtrl', RaceDetailsCtrl);

//RaceDetailsCtrl.$inject = ['$routeParams', 'restangular', 'authService']

function RaceDetailsCtrl($routeParams, Restangular, authService) {
  // Get one race with restanuglar.
  Restangular.one('races', $routeParams.id).get().then(function(result){
      // Converting to datetime object.
      result.date = new Date(result.date);
      result.tag_list = result.tag_list.join(', ');
      $scope.race = result;
      generateMap(result.longitude, result.latitude);
  });

  // Generating map with leaflet plugin.
  function generateMap(longitude, latitude) {
    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
  }

  // True if user wants to edit race.
  $scope.wantsToEdit;

  var authHeaderValue = 'Bearer '+authService.getAuthToken();

  $scope.edit = function() {
    $scope.race.put('', {'Authorization': authHeaderValue}).then(function(result) {
      $scope.wantsToEdit = false;
      $scope.successTextAlert = "Lopp uppdaterat!";
      $scope.showSuccessAlert = true;
      generateMap(result.longitude, result.latitude);
    }, function(response) {
      console.log(response);
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
      $location.path('/');
      $scope.successTextAlert = "Lopp raderat!";
      $scope.showSuccessAlert = true;
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

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };
}
