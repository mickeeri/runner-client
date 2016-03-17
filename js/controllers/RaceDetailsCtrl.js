angular.module('raceApp').controller('RaceDetailsCtrl', function ($scope, $routeParams, Restangular, authService) {


  // TODO: one url

  Restangular.one('races', $routeParams.id).get().then(function(result){
      // Converting to datetime object.
      result.date = new Date(result.date);
      $scope.race = result;
  });

  $scope.wantsToEdit;

  $scope.switchBool = function(value) {
    $scope[value] = !$scope[value];
  };

  $scope.edit = function() {
    var authHeaderValue = 'Bearer '+authService.getAuthToken();

    $scope.race.put('', {'Authorization': authHeaderValue}).then(function(race) {
      $scope.wantsToEdit = false;
      $scope.successTextAlert = "Lopp uppdaterat!";
      $scope.showSuccessAlert = true;
    }, function(response) {
      // Show errors.
      if (response.data) {
        $scope.errorTextAlert = response.data.user_message;
      } else {
        $scope.errorTextAlert = "Ett fel uppstod när loppet skulle uppdateras.";
      }
      $scope.showErrorAlert = true;
    });
  }

  var authHeaderValue = 'Bearer '+authService.getAuthToken();

  $scope.delete = function() {


    $scope.race.remove('', {'Authorization': authHeaderValue}).then(function(result) {
      $location.path('/');
      $scope.successTextAlert = "Lopp raderat!";
      $scope.showSuccessAlert = true;
    }), function(response) {
      // Show errors.
      if (response.data) {
        $scope.errorTextAlert = response.data.user_message;
      } else {
        $scope.errorTextAlert = "Ett fel uppstod när loppet skulle raderas.";
      }
      $scope.showErrorAlert = true;
    };
  }
});
