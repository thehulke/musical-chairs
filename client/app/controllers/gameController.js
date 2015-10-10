(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', ['$scope', 'roomService', '$stateParams', '$interval', '$meteor', GameCtrl]);

  function GameCtrl($scope, roomService, $stateParams, $interval, $meteor) {
    var _this = this;
    _this.room = $meteor.object(Room, $stateParams.gameId);

    init();

    ///////////////////////////

    function init() {
      roomService.enterRoom($stateParams.gameId);
      roomService.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
    }

    function timerWatcher() {
      return roomService.getTimer(); // TODO: set timer interval
    }

    function timerAction(newVal, oldVal) {
      $scope.$on('chair-clicked', clickAction);
    }

    function clickAction(event, args) {
      //
    }

    function createChairs(chairsNumber) {
      //
    }
  }

}(angular));
