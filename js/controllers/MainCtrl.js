angular
  .module('raceApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'AuthService']

function MainCtrl($scope, AuthService) {

  $scope.errorTextAlert;
  $scope.showErrorAlert;
  $scope.showSuccessAlert;

  $scope.isLoggedIn = function() {
    return AuthService.isLoggedIn;
  }

  $scope.logout = function() {
    AuthService.logout();
  }
}
