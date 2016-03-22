angular
  .module('raceApp')
  .controller('CreateRaceCtrl', CreateRaceCtrl);

CreateRaceCtrl.$inject = ['$scope', '$location', 'Restangular', 'AuthService'];

function CreateRaceCtrl($scope, $location, Restangular, AuthService) {

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };

  $scope.add = function() {
    var authHeaderValue = 'Bearer '+AuthService.getAuthToken();

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
