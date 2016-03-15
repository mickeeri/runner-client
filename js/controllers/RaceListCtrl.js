angular.module('race').controller('RaceListCtrl', function ($scope, Restangular) {

    $scope.selectedTags = [];
    // Setting default limit and offset for paging.
    $scope.limit = 8;
    $scope.offset = 0;

    // Making the first get request to api.
    makeRequest($scope);

    $scope.search = function() {
      makeRequest($scope)
    }

    $scope.next = function() {
      $scope.offset = $scope.races.next_offset;
      makeRequest($scope);
    }

    $scope.previous = function() {
      $scope.offset = $scope.races.previous_offset;
      makeRequest($scope);
    }

    $scope.imChanged = function() {
      makeRequest($scope);
    }

    function makeRequest($scope) {

      var queryParams = new Object();

      if ($scope.selectedTags.length > 0) {
        queryParams.tags = $scope.selectedTags.join('+');
      }
      queryParams.offset = $scope.offset;
      queryParams.limit = $scope.limit;

      if ($scope.q != undefined) {
        queryParams.q = $scope.q;
      }

      console.log(queryParams);

      Restangular.all('races').getList(queryParams).then(function(result) {
        $scope.races = result;
      });
    }
});
