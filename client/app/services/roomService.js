(function(angular) {

  angular.module('chairGame')
    .factory('gameService', ['$meteor', 'MAXPLAYERS', gameService]);

  function gameService($meteor, MAXPLAYERS) {
    var gameId;

    service = {
      enterGame: enterGame,
      findEmpty: findEmpty,
      create: create,
      addPlayer: addPlayer,
      findOneEmpty: findOneEmpty,
      getParticipents: getParticipents,
      setTimer: setTimer,
      getTimer: getTimer,
      getGameId: getGameId,
    };

    return service;

    ////////////////////////////

    function getTimer() {
      //
    }

    function setTimer(min, max) {
      var game = $meteor.object(Game, gameId, false);
      var randTimeOut = (Math.random() * (max - min)) + min;
      var timeOutDate = Date.now();
      if (game.gameStart) {
        game.timer = Math.floor(timeOutDate + randTimeOut);
        game.save();
      }

    }

    function getParticipents() {
      var game = $meteor.object(Game, gameId);
      return game.players.length;
    }

    function enterGame(newGameId) {
      gameId = newGameId;
    }

    function findEmpty() {
      return $meteor.collection(Game, {
        gameStart: false,
      });
    }

    function findOneEmpty() {
      return $meteor.object(Game, {
        gameStart: false,
      }, false);
    }

    function create(gameDetails) {
      Session.set('currentPlayer', gameDetails.players[0]._id);
      return Game.insert(gameDetails);
    }

    function addPlayer(gameId, playerDetails) {
      var game = $meteor.object(Game, gameId, false);
      var player = playerDetails;
      player._id = Random.id();

      if (game.players.length >= MAXPLAYERS - 1) {
        game.gameStart = true;
      }

      Session.set('currentPlayer', player._id);
      game.players.push(player);

      game.save();
      return game;
    }

    function getGameId() {
      return gameId;
    }
  }

}(angular));
