(function(angular) {
  console.log('chair directive');

  angular.module('chairGame')
    .directive('chairDirective', [chairDirective]);

  function chairDirective() {
    return {
      restrict: 'E',
      template: '',
    };
  }

}(angular));
