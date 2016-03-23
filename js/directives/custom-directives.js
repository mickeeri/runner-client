// Directive to focus on input when page loads.
angular
  .module('raceApp')
  .directive('autoFocus',
  function($timeout) {
    return {
      restrict: 'A', // Only match attribute name.
      link: function(scope, element) {
        $timeout(function(){
          element[0].focus();
        }, 0);
      }
    };
});

// Directive for fading out elements after timeout.
angular
  .module("raceApp")
  .directive('autoHide',
  function($timeout){
    return {
      restrict: 'A',
      link: function(scope, element) {
        $timeout(function(){
          element.fadeOut("slow");
        }, 4000);
      }
    }
});
