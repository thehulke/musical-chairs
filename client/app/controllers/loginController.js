(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', ['roomService', '$state', 'EMPTYROOM', LoginCtrl]);

  function LoginCtrl(roomService, $state, EMPTYROOM) {

    this.playAsGuest = function() {
      var freeRoom = roomService.findOneEmpty();
      var playerName = this.playerName;
      var gameId, playerId;
      var emptyRoom;
      playerId = Random.id();

      if (!freeRoom) {
        angular.copy(EMPTYROOM, emptyRoom);
        emptyRoom.players.push({
          _id: playerId,
          name: playerName
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
