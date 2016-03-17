angular
  .module('raceApp')
  .controller('RaceListCtrl', RaceListCtrl);

//RaceListCtrl.$inject = ['restangular', 'authService'];

function RaceListCtrl(Restangular, authService) {

  var vm = this;

  // Array of selected tags.
  vm.selectedTags = [];
  // Setting default limit and offset for paging.
  vm.limit = 8;
  vm.offset = 0;

  // Initial request to api.
  makeRequest(vm);

  vm.search = function() {
    makeRequest(vm)
  }

  vm.next = function() {
    vm.offset = vm.races.next_offset;
    makeRequest(vm);
  }

  vm.previous = function() {
    vm.offset = vm.races.previous_offset;
    makeRequest(vm);
  }

  vm.checkboxHasChanged = function() {
    vm.offset = 0;
    makeRequest(vm);
  }

  vm.reset = function() {
    vm.q = '';
    makeRequest(vm);
  }

  vm.switchBool = function(value) {
     vm[value] = !vm[value];
  };

  function makeRequest(vm) {
    var queryParams = new Object();

    // Setting query parameters.
    if (vm.selectedTags.length > 0) {
      queryParams.tags = vm.selectedTags.join('+');
    }

    queryParams.offset = vm.offset;
    queryParams.limit = vm.limit;

    if (vm.q != undefined) {
      queryParams.q = vm.q;
    }

    Restangular.all('races').getList(queryParams).then(function(result) {

      vm.races = result;

    }, function(response) {
      // Show errors.
      if (response.data) {
        vm.errorTextAlert = response.data.user_message;
      } else {
        vm.errorTextAlert = "Fel uppstod när data skulle hämtas från servern.";
      }
      vm.showErrorAlert = true;
    });
  }
}
