angular.module('race').controller('RaceListCtrl', function ($scope, Restangular) {

    Restangular.all('races').getList().then(function(result){
        $scope.races = result;
    });

});
