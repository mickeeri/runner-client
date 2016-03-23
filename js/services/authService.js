angular
  .module('raceApp')
  .factory('AuthService', AuthService);

  AuthService.$inject = ['localStorageService', 'LocalStorageConstants'];

  function AuthService (localStorageService, LS) {

    return {
      getAuthToken: function() {
        return localStorageService.get(LS.jwtKey);
      },

      login: function(jwt, owner) {
        localStorageService.set(LS.jwtKey, jwt);
        localStorageService.set('currentUser', owner)
      },

      isLoggedIn: function() {
        return localStorageService.get(LS.jwtKey) != undefined;
      },

      logout: function() {
        localStorageService.remove(LS.jwtKey);
        localStorageService.remove(LS.currentUserKey);
      },

      getCurrentUser() {
        return localStorageService.get(LS.currentUserKey);
      }
    }
  }
