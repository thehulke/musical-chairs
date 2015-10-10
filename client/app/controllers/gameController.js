(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', ['$scope', 'roomService', '$stateParams', '$timeout', '$meteor', '$rootScope', GameCtrl]);

  function GameCtrl($scope, roomService, $stateParams, $timeout, $meteor, $rootScope) {
    var _this = this;
    var eventRun = false;

    _this.room = $meteor.object(Room, $stateParams.gameId);
    _this.clickable = false;

    init();

    ///////////////////////////

    function init() {
      roomService.enterRoom($stateParams.gameId);
      roomService.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
    }

    function timerWatcher() {
      return _this.room.timer;
    }

    function timerAction(newVal, oldVal) {
      if (newVal > 0) {
        console.log(newVal, Date.now());
        $timeout(function() {
          _this.clickable = true;
        }, newVal - Date.now());
      }

      $scope.$on('chair-clicked', clickAction);
    }

    function clickAction(event, args) {
      if (!eventRun) {
        eventRun = true;
        if (_this.clickable && !_this.room.chairs[args.chairId]) {
          _this.room.chairs[args.chairId] = Session.get('currentPlayer');
          _this.clickable = false;
          alert('you have a sit');
        } else if (_this.room.chairs[args.chairId]) {
          alert('sit is taken');
        } else {
          alert('you clicked to early');
        }

        $timeout(function() {eventRun = false;}, 100);
      }
    }

  }

}(angular));
