angular
  .module('raceApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, localStorageService, authService) {

  $scope.errorTextAlert;
  $scope.showErrorAlert;
  $scope.showSuccessAlert;

  $scope.isLoggedIn = function() {
    return localStorageService.get('jwt') != undefined;
  }

  $scope.logout = function() {
    authService.logout();
  }
}
