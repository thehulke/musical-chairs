(function(angular) {
  console.log('chair directive');

  angular.module('chairGame')
    .directive('chairDirective', [chairDirective]);

  function chairDirective() {
    return {
      restrict: 'E',
      template: '<div class="chair">x</div>',
      link: chairDirectiveLink,
    };

    ////////////////////////////

    function chairDirectiveLink(scope, elem) {

    }
  }

}(angular));
