(function(angular) {
  console.log('chair holder directive');

  angular.module('chairGame')
    .directive('chairHolderDirective', ['$compile', chairHolderDirective]);

  function chairHolderDirective($compile) {
    return {
      restrict: 'E',
      template: '',
      scope: {
        number: '=',
      },
      link: chairHolderDirectiveLink,
    };

    ////////////////////////////

    function chairHolderDirectiveLink(scope, elem, attrs) {
      scope.$watch(numberOfChairs,
        changeChairs
      );

      function numberOfChairs() {
        return attrs.number;
      }

      function changeChairs(newVal, oldVal) {
        var i;

        for (i = 1; i <= newVal; i++) {
          elem.append($compile('<chair-directive></chair-directive>')(scope));
        }
      }

    }
  }

}(angular));
