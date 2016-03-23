angular
  .module('raceApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'AuthService']

function MainCtrl($scope, AuthService) {
  $scope.init = function() {
    if (!$scope.keepMessage) {
      $scope.successTextAlert = "";
      $scope.errorTextAlert = "";
      $scope.showErrorAlert = false;
      $scope.showSuccessAlert = false;
    }
    $scope.keepMessage = false;
  }

  $scope.keepMessage = false;

  $scope.isLoggedIn = function() {
    return AuthService.isLoggedIn();
  }

  $scope.logout = function() {
    AuthService.logout();
  }
}
