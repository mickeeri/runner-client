angular.module('raceApp').controller('LoginCtrl', function ($scope, $location, Restangular, localStorageService, authService) {

// TODO: loginmethod i authSerice.

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };

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
      // 404 best practice for failed authentification according to knock rails gem creator.
      if (response.status === 404) {
        $scope.errorTextAlert = "Inloggning misslyckades. Felaktiga uppgifter.";
      } else {
        $scope.errorTextAlert = "Serverfel. Försök igen senare.";
      }
      $scope.showErrorAlert = true;
      authService.logout();
    });
  }
});
