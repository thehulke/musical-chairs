(function(angular) {
  console.log('chair directive');

  angular.module('chairGame')
    .directive('chairDirective', [chairDirective]);

  function chairDirective() {
    return {
      restrict: 'E',
      template: '<button class="chair" ng-click="sendEvent()">sit</button>',
      scope: {
        chairid: '@',
      },
      controller: chairDirectiveController,
    };

    ////////////////////////////

    function chairDirectiveController($rootScope, $scope) {

      $scope.sendEvent = function() {
        $rootScope.$broadcast('chair-clicked', {chairId: $scope.chairid - 1});
      };
    }

    chairDirectiveController.inject(['$rootScope', '$scope']);
  }

}(angular));
