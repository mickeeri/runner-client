angular
  .module('raceApp')
  .factory('AuthService', AuthService);

  AuthService.$inject = ['localStorageService', 'LocalStorageConstants'];

  function AuthService (localStorageService, LS) {

    return {
      getAuthToken: function() {
        return localStorageService.get(LS.jwtKey);
      },

      login: function(jwt) {
        localStorageService.set(LS.jwtKey, jwt);
      },

      isLoggedIn: function() {
        return localStorageService.get(LS.jwtKey) != undefined;
      },

      logout: function() {
        localStorageService.remove(LS.jwtKey);
      }
    }
  }
