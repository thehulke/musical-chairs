(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', ['gameService', '$state', 'EMPTYROOM', LoginCtrl]);

  function LoginCtrl(gameService, $state, EMPTYROOM) {
    var _this = this;

    _this.playAsGuest = function() {
      var freeGame = gameService.findOneEmpty();
      var playerName = _this.playerName;
      var gameId;
      var playerId;
      var emptyGame;

      playerId = Random.id();

      if (!freeGame._id) {
        emptyGame = angular.copy(EMPTYROOM);
        emptyGame.players.push({
          _id: playerId,
          name: playerName,
        });

        gameId = gameService.create(emptyGame);
      } else {
        gameId = freeGame._id;
        gameService.addPlayer(freeGame._id, {
          name: playerName,
        });

      }

      $state.go('game', {gameId: gameId});
    };
  }

}(angular));
