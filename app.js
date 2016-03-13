angular.module('race', ['restangular', 'ngRoute']).
    config(function ($routeProvider, $locationProvider, RestangularProvider) {
        $routeProvider.
            when('/', {
              controller: 'RaceListCtrl',
              templateUrl: 'partials/race-list.html'
            }).
            when('/race/:id', {
                controller: 'RaceDetailsCtrl',
                templateUrl: 'partials/race-details.html'
            }).
            when('/new', {
              controller: 'CreateRaceCtrl',
              templateUrl: 'partials/new-race.html'
            }).
            otherwise({redirectTo: '/'});
          $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl('http://localhost:3000/api/v1/');
        RestangularProvider.setDefaultRequestParams({ api_key: 'cf46dd8a63811111469ea022d320f51f'});
        RestangularProvider.setDefaultHeaders({ Accept: 'application/json'});
    });
