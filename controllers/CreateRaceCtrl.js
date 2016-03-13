angular.module('race').controller('CreateRaceCtrl', function ($scope, $location, Restangular) {
  $scope.add = function() {
    Restangular.all('races').post($scope.race, {}, {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTc5NzYyNzcsImF1ZCI6ZmFsc2UsInN1YiI6MX0.EBbnBYgbxDvBxFLg_bmKaYJCkwsv9N1ySrYm-LlRUSg'}).then(function(race) {
      console.log("all ok");
      $location.path('/race-list');
    }, function(response) {
      console.log(response.data.developer_message);
    });
  }
});



// function CreateRaceCtrl($scope, $location, Restangular) {
//   console.log("Hejsan.");
//

// }
//
//
// angular.module('race').controller('RaceDetailsCtrl', function ($scope, $routeParams, Restangular) {
//
//   Restangular.one('races', $routeParams.id).get().then(function(result){
//       $scope.race = result;
//   });
//
// });
