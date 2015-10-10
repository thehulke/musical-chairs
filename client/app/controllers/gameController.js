(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', ['$scope', 'roomService', '$stateParams', GameCtrl]);

  function GameCtrl($scope, roomService, $stateParams) {
    init();

    ///////////////////////////

    function init() {
      createChairs(roomService.getParticipents($stateParams.gameId) - 1);
      roomService.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
    }

    function timerWatcher() {
      return roomService.getTimer();
    }

    function timerAction(newVal, oldVal) {
      $scope.on('chair-clicked', clickAction);
    }

    function clickAction(event, args) {
      //
    }
  }

}(angular));
