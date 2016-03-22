angular
  .module('raceApp')
  .factory('AuthService', AuthService);

  AuthService.$inject = ['localStorageService'];

  function AuthService (localStorageService) {

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
  }
