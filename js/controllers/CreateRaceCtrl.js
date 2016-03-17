angular
  .module('raceApp')
  .controller('CreateRaceCtrl', CreateRaceCtrl);

function CreateRaceCtrl($scope, $location, Restangular, authService) {

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };

  $scope.add = function() {
    var authHeaderValue = 'Bearer '+authService.getAuthToken();

    Restangular.all('races').post($scope.race, '', {'Authorization': authHeaderValue}).then(function(race) {
      $scope.successTextAlert = "Lopp skapat!";
      $scope.showSuccessAlert = true;
      $location.path(race.self_path);
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
