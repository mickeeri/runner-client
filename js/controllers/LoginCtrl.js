angular.module('race').controller('LoginCtrl', function ($scope, $location, Restangular) {

  $scope.login = function() {
    Restangular.all('auth_token').post({'auth' : $scope.owner}).then(function(race) {
      console.log(race.jwt);
      // $location.path('/race-list');
    }, function(response) {
      $scope.errorTextAlert = "Felaktiga uppgifter. Kunde inte logga in.";
      $scope.showErrorAlert = true;
      // switch flag
      $scope.switchBool = function(value) {
         $scope[value] = !$scope[value];
      };
    });
  }
});
