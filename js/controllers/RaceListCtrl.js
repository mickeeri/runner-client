angular.module('raceApp').controller('RaceListCtrl', function ($scope, Restangular, authService) {

  $scope.selectedTags = [];
  // Setting default limit and offset for paging.
  $scope.limit = 8;
  $scope.offset = 0;

  // Making the first get request to api.


  $scope.loggedIn = authService.isLoggedIn();

  //console.log(authService.isLoggedIn());
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

  $scope.reset = function() {
    $scope.q = '';
    makeRequest($scope);
  }

  $scope.switchBool = function(value) {
     $scope[value] = !$scope[value];
  };

  function makeRequest($scope) {

    var queryParams = new Object();

    // Setting query parameters.
    if ($scope.selectedTags.length > 0) {
      queryParams.tags = $scope.selectedTags.join('+');
    }

    queryParams.offset = $scope.offset;
    queryParams.limit = $scope.limit;

    if ($scope.q != undefined) {
      queryParams.q = $scope.q;
    }

    Restangular.all('races').getList(queryParams).then(function(result) {
      $scope.races = result;
    }, function(response) {
      // Show errors. 
      if (response.data) {
        $scope.errorTextAlert = response.data.user_message;
      } else {
        $scope.errorTextAlert = "Fel uppstod när data skulle hämtas från servern.";
      }
      $scope.showErrorAlert = true;
    });
  }
});
