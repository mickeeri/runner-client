angular.module('race').controller('RaceDetailsCtrl', function ($scope, $routeParams, Restangular) {

  Restangular.one('races', $routeParams.id).get().then(function(result){
      $scope.race = result;
  });
});
