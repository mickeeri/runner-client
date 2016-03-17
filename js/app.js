angular
  .module('raceApp', ['restangular', 'ngRoute', 'checklist-model', 'LocalStorageModule'])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider.
        when('/', {
          controller: 'RaceListCtrl',
          templateUrl: 'partials/race-list.html',
          controllerAs: 'vm'
        }).
        when('/race/:id', {
            controller: 'RaceDetailsCtrl',
            templateUrl: 'partials/race-details.html'
        }).
        when('/new', {
          controller: 'CreateRaceCtrl',
          templateUrl: 'partials/new-race.html'
        }).
        when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'partials/login.html'
        }).
        otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('http://localhost:3000/api/v1/');
    RestangularProvider.setDefaultRequestParams({ api_key: 'cf46dd8a63811111469ea022d320f51f' });
    RestangularProvider.setDefaultHeaders({ Accept: 'application/json'});
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, respond, deferred) {
      var extracedData;
      if (operation === "getList") {
        extracedData = data.races;
        extracedData.next_offset = data.next_offset;
        extracedData.previous_offset = data.previous_offset;
        extracedData.limit = data.limit;
        extracedData.offset = data.offset;
        extracedData.tags = data.tags;
      } else {
        extracedData = data;
      }
      return extracedData;
    });
    RestangularProvider.setRestangularFields({
      selfLink: "self_url"
    });

    RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

      if (operation === 'put') {
        // Elements that I don't want in put request.
        elem.self_path = undefined;
        elem.latitude = undefined;
        elem.longitude = undefined;
        return elem;
      }
      return elem;
    })
  })
  .config(function(localStorageServiceProvider) {
    // Configuration for angular-local-storage module.
    localStorageServiceProvider
      .setPrefix('raceApp')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
  });
