angular.module('raceApp').controller('LoginCtrl', function ($scope, $location, Restangular, localStorageService, authService) {

// TODO: loginmethod i authSerice.

  $scope.login = function() {
    Restangular.all('auth_token').post({'auth' : $scope.owner}).then(function(response) {
      var savedToLocalStorage = localStorageService.set('jwt', response.jwt);
      // Redirect to start page if successfully saved jwt in local storage.
      if (savedToLocalStorage) {
        $location.path('/');
      } else {
        $scope.errorTextAlert = "Ett fel uppstod.";
        $scope.showErrorAlert = true;
      }
    }, function(response) {
      $scope.errorTextAlert = "Felaktiga uppgifter. Kunde inte logga in.";
      $scope.showErrorAlert = true;
      authService.logout();
    });
  }

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };
});
