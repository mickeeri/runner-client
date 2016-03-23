angular
  .module('raceApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$location', 'Restangular', 'localStorageService', 'AuthService']

function LoginCtrl($scope, $location, Restangular, localStorageService, AuthService) {
  $scope.$parent.resetMessages();

  $scope.login = function() {
    $scope.$parent.resetMessages();

    Restangular.all('auth_token').post({'auth' : $scope.owner}).then(function(response) {
      console.log($scope.owner);
      // Login and redirect to start.
      AuthService.login(response.jwt, $scope.owner.email);
      $location.path('/');
    }, function(response) {
      // 404 best practice for failed authentification according to knock rails gem creator.
      if (response.status === 404) {
        $scope.$parent.errorTextAlert = "Kunde inte hitta en användare med de uppgifterna.";
      } else {
        $scope.$parent.errorTextAlert = "Serverfel. Försök igen senare.";
      }
      $scope.$parent.showErrorAlert = true;
    });
  }
}
