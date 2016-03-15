angular.module('race').controller('CreateRaceCtrl', function ($scope, $location, Restangular) {

  $scope.add = function() {
    Restangular.all('races').post({'race':$scope.race}, {}, {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTgxNjUzOTIsImF1ZCI6ZmFsc2UsInN1YiI6MX0.HDujDyqG8fEVXwVjpu12ELpPJzebvUCEx7WBidFtBdA'}).then(function(race) {
      console.log("all ok");
      $location.path('/');
    }, function(response) {
      console.log(response.data.developer_message);
    });
  }
});
