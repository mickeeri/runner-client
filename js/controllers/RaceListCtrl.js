angular.module('race').controller('RaceListCtrl', function ($scope, Restangular) {

    // Restangular.all('races').getList({limit: 3, offset: 0}).then(function(result){
    //
    //     $scope.races = result;
    //     console.log($scope.races);
    // });

    $scope.races = Restangular.all('races').getList().$object;

    $scope.search = function() {
      console.log($scope.q);
      Restangular.all('races').getList({'q':$scope.q}).then(function(result) {
        $scope.races = result;
      });
    }
});
