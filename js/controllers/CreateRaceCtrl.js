angular.module('raceApp').controller('CreateRaceCtrl', function ($scope, $location, Restangular, authService) {

  //var token = authService.getAuthToken();

  //console.log(token);

  $scope.add = function() {
    //console.log(authService.getAuthToken());

    var authHeaderValue = 'Bearer '+authService.getAuthToken();

    console.log(authHeaderValue);

    Restangular.all('races').post({'race':$scope.race}, {}, {'Authorization': authHeaderValue}).then(function(race) {
      console.log("all ok");
      // TODO: Redirect till loppets sida istället.
      $location.path('/');
    }, function(response) {
      // TODO: skriv ut felmeddelande.
      console.log(response.data.developer_message);
    });
  }
});
