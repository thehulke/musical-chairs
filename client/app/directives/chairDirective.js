(function(angular) {
  console.log('chair directive');

  angular.module('chairGame')
    .directive('chairDirective', [chairDirective]);

  function chairDirective() {
    return {
      restrict: 'E',
      template: '<button class="chair" ng-click="sendEvent()" ng-class="{taken: isTaken}">sit</button>',
      scope: {
        chairid: '@',
      },
      controller: chairDirectiveController,
    };

    ////////////////////////////

    function chairDirectiveController($rootScope, $scope) {

      $scope.$watch(function() {
        return $scope.$parent.$parent.game.room.chairs[$scope.chairid - 1];
      },

      function(newVal, oldVal) {
        $scope.isTaken = $scope.$parent.$parent.game.room.chairs[$scope.chairid - 1];
      },

      true);
      $scope.sendEvent = function() {
        $rootScope.$broadcast('chair-clicked', {chairId: $scope.chairid - 1});
      };
    }

    chairDirectiveController.inject(['$rootScope', '$scope']);
  }

}(angular));
