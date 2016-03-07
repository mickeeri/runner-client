'use strict';
/*global angular*/

angular.module("raceApp", ['ngRoute', 'LocalStorageModule']).
    config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: '/partials/index.html'
        }).
        when('/races', {
          templateUrl: '/partials/race-list.html',
          controller: 'RaceListController',
          controllerAs: 'races' 
        }).
        otherwise({
          redirectTo: '/'
        });
      $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
    }])
    .config(function (localStorageServiceProvider) {
      // The module give me some stuff to configure
      localStorageServiceProvider
          .setPrefix('raceApp')
          .setStorageType('sessionStorage')
          .setNotify(true, true)
    })
    .constant('API', { 
      'key': "cf46dd8a63811111469ea022d320f51f", 
      'url': "http://localhost:3000/api/v1/", 
      'format': 'application/json' 
    })
    .constant('LocalStorageConstants', {
      'racesKey' : 'r', 
      'locationsTeam'   : 'l'
    });