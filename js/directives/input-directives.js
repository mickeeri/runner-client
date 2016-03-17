// Directive to focus on input when page loads.
angular.module('raceApp').directive('autoFocus', function($timeout) {
  return {
    restrict: 'A', // Only match attribute name.
    link: function(_scope, _element) {
      $timeout(function(){
        _element[0].focus();
      }, 0);
    }
  };
});

// Directive that triggers event on keypress.
angular.module("raceApp").directive('dlKeyCode', dlKeyCode);
  function dlKeyCode() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode;

          if (keyCode == $attrs.code) {
            $scope.$apply(function() {
              $scope.$eval($attrs.dlKeyCode, {$event: event});
            });

          }
        });
      }
    };
  }
