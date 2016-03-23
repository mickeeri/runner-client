angular
  .module('raceApp')
  .controller('CreateRaceCtrl', CreateRaceCtrl);

CreateRaceCtrl.$inject = ['$scope', '$location', 'Restangular', 'AuthService'];

function CreateRaceCtrl($scope, $location, Restangular, AuthService) {
  var vm = this;
  $scope.$parent.resetMessages();

  vm.add = function() {
    $scope.$parent.resetMessages();

    var authHeaderValue = 'Bearer '+AuthService.getAuthToken();
    Restangular.all('races').post(vm, '', {'Authorization': authHeaderValue}).then(function(race) {
      $scope.$parent.successTextAlert = "Lopp skapat!";
      $scope.$parent.showSuccessAlert = true;
      $scope.$parent.keepMessage = true;
      $location.path(race.self_path);
    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.$parent.errorTextAlert = response.data.user_message;
      } else {
        $scope.$parent.errorTextAlert = "Ett fel uppstod när loppet skulle skapas.";
      }
      $scope.$parent.showErrorAlert = true;
    });
  }
}
