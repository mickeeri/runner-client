angular.module('raceApp').controller('authController', function ($scope, localStorageService, authService) {


  $scope.errorTextAlert;
  $scope.showErrorAlert;
  $scope.showSuccessAlert;

  $scope.isLoggedIn = function() {
    return localStorageService.get('jwt') != undefined;
  }

  $scope.logout = function() {
    authService.logout();
  }





});
