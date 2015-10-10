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
      _this.room.finished = false;

      $scope.$watch(timerWatcher, timerAction, true);
      $scope.$watch(function() {
        return _this.room.finished;
      },

      function(newVal, oldVal) {
        if (newVal) {
          announceWinners();
          restartGame();
        }
      },

      true);
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
          if (chackTakenSits(_this.room.chairs)) {
            _this.room.finished = true;
          }
        } else if (_this.room.chairs[args.chairId]) {
          alert('sit is taken');
        } else {
          alert('you clicked to early');
        }

        $timeout(function() {eventRun = false;}, 100);
      }
    }

    function chackTakenSits(chairs) {
      var full = true;
      var i;
      for (i = 0; i < chairs.length; i++) {
        if (!chairs[i]) {
          full = false;
        }
      }

      return full;
    }

    function restartGame() {

    }

    function announceWinners() {
      var i;
      var j;
      var winner = false;

      for (i = 0; i < _this.room.chairs.length; i++) {
        if (_this.room.chairs[i] === Session.get('currentPlayer')) {
          winner = true;
        }
      }

      if (winner) {
        alert('you win!');
      } else {
        alert('you lose :(');
        for (j = 0; j < _this.room.players.length; j++) {
          _this.room.players.splice(j, 1);
        }
      }

    }
  }

}(angular));
