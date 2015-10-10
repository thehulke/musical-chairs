(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', ['roomService', '$state', '$cookies', LoginCtrl]);

  function LoginCtrl(roomService, $state, $cookies) {

    this.playAsGuest = function() {
      var freeRoom = roomService.findOneEmpty();
      var playerName = this.playerName;
      var gameId, playerId;

      if (!freeRoom) {
        playerId = Random.id();
        gameId = roomService.create({
          gameStart: false,
          players: [{
            _id: playerId,
            name: playerName
          }]
        });
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
