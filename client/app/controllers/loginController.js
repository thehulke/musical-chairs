(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', ['roomService', '$state', 'EMPTYROOM', LoginCtrl]);

  function LoginCtrl(roomService, $state, EMPTYROOM) {
    var _this = this;

    _this.playAsGuest = function() {
      var freeRoom = roomService.findOneEmpty();
      var playerName = _this.playerName;
      var gameId;
      var playerId;
      var emptyRoom;

      playerId = Random.id();

      if (!freeRoom) {
        emptyRoom = angular.copy(EMPTYROOM);
        emptyRoom.players.push({
          _id: playerId,
          name: playerName,
        });

        gameId = roomService.create(emptyRoom);
      } else {
        gameId = freeRoom._id;
        roomService.addPlayer(freeRoom._id, {
          name: playerName,
        });

      }

      $state.go('game', {gameId: gameId});
    };
  }

}(angular));
