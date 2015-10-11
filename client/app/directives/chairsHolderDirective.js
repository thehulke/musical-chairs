(function(angular) {
  console.log('chair holder directive');

  angular.module('chairGame')
    .directive('chairHolderDirective', chairHolderDirective);

  function chairHolderDirective($compile) {
    return {
      restrict: 'E',
      template: '',
      scope: {
        number: '@',
      },
      link: chairHolderDirectiveLink,
    };

    ////////////////////////////

    function chairHolderDirectiveLink(scope, elem, attrs) {
      var currentChairs = 0;

      scope.$watch(numberOfChairs,
        changeChairs
      );

      function numberOfChairs() {
        return attrs.number;
      }

      function changeChairs(newVal, oldVal) {
        var i;

        if (newVal > currentChairs) {
          elem.children().remove();

          for (i = 1; i <= newVal; i++) {
            elem.append($compile('<chair-directive chairId="' + i + '" class="btn-group" role="group"></chair-directive>')(scope));
          }

          currentChairs = newVal;
        }
      }

    }
  }

  chairHolderDirective.$inject = ['$compile'];

}(angular));
