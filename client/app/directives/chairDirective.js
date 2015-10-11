(function(angular) {
  console.log('chair directive');

  angular.module('chairGame')
    .directive('chairDirective', [chairDirective]);

  function chairDirective() {
    return {
      restrict: 'E',
      templateUrl: 'client/app/views/chairDir.ng.html',
      scope: {
        chairid: '@',
      },
      controller: chairDirectiveController,
    };

    ////////////////////////////

    function chairDirectiveController($rootScope, $scope) {

      $scope.$watch(function() {
        return $scope.$parent.$parent.game.game.chairs[$scope.chairid - 1];
      },

      function(newVal, oldVal) {
        $scope.isTaken = $scope.$parent.$parent.game.game.chairs[$scope.chairid - 1];
      },

      true);
      $scope.sendEvent = function() {
        $rootScope.$broadcast('chair-clicked', {chairId: $scope.chairid - 1});
      };
    }

    chairDirectiveController.inject(['$rootScope', '$scope']);
  }

}(angular));
