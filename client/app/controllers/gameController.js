(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', ['$scope', 'roomService', '$stateParams', '$interval', GameCtrl]);

  function GameCtrl($scope, roomService, $stateParams, $interval) {
    var _this = this;

    _this.chairsNumber = 0;

    init();

    ///////////////////////////

    function init() {
      roomService.enterRoom($stateParams.gameId);
      _this.chairsNumber = roomService.getParticipents() - 1;
      roomService.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
    }

    function timerWatcher() {
      var room = roomService.getRoomId();
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
