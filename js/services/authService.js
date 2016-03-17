angular.module('raceApp').factory('authService', function(localStorageService) {
  return {
    getAuthToken: function() {
      return localStorageService.get('jwt');
    },

    isLoggedIn: function() {
      return localStorageService.get('jwt') != undefined;
    },

    logout: function() {
      localStorageService.remove('jwt');
    }
  }
});
