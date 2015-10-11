(function(angular) {

  angular.module('chairGame')
    .factory('gameService', gameService);

  function gameService($meteor, MAXPLAYERS, EMPTYROOM) {

    function gameFactory(gameId) {
      if (!gameId) {
        console.error('gameId is not defined');
      }
      this.gameId = gameId;
      this.game = $meteor.object(Game, gameId, false);
    }

    gameFactory.prototype.getChair = function(chairId) {
      return this.game.chairs[chairId];
    }

    gameFactory.prototype.setTimer = function(min, max) {
      var randTimeOut = (Math.random() * (max - min)) + min;
      var timeOutDate = Date.now();
      if (this.getStatus() === 1) {
        $meteor.call('set_timer', this.gameId, Math.floor(timeOutDate + randTimeOut));
        // this.game.timer = Math.floor(timeOutDate + randTimeOut);
        // this.game.save();
      }
    }

    gameFactory.prototype.getTimer = function() {
      return this.game.timer;
    }

    gameFactory.prototype.getParticipents = function() {
      return this.game.players.length;
    }

    gameFactory.findEmptyGame = function() {
      var emptyGame = $meteor.object(Game, {status: 0}, false);
      return emptyGame._id;
    }

    gameFactory.create = function(gameDetails) {
      var newGame = Game.insert(EMPTYROOM);
      return newGame;
    }

    gameFactory.prototype.addPlayer = function(playerDetails) {
      var player = playerDetails;
      player._id = Random.id();

      if (this.getParticipents() >= MAXPLAYERS - 1) {
        this.setStatus(1);
      }

      Session.set('currentPlayer', player._id);
      this.game.players.push(player);

      this.game.save();
      return player._id;
    }

    gameFactory.prototype.checkTakenChair = function(chairNumber) {
      return !!this.game.chairs[chairNumber];
    }

    gameFactory.prototype.playerSitOnChair = function(chairNumber) {
      var i;
      var counter = 0;

      this.game.chairs[chairNumber] = Session.get('currentPlayer');
      this.game.save();

      for(i = 0; i < this.game.chairs.length; i++) {
        if (this.game.chairs[i]) {
          counter ++;
        }
      }

      return counter;
    }

    /**
     * status 0 mean the game didn't started yet
     * status 1 mean the game is on
     * status 2 mean the timer stop and people can sit
     * status 3 mean the round is finished
     * status 4 mean the game is finished
     */
    gameFactory.prototype.setStatus = function(newStatus) {
      if(newStatus > this.game.status) {
        this.game.status = newStatus;
      } else {
        console.warn('you try to set status to lower level');
      }
      this.game.save();
    }

    gameFactory.prototype.getStatus = function() {
      return this.game.status;
    }

    gameFactory.prototype.checkIfPlayerWin = function() {
      var i;

      for(i = 0; i < this.game.chairs.length; i++) {
        if (this.game.chairs[i] === Session.get('currentPlayer')) {
          return true;
        }
      }

      return false;
    }

    gameFactory.prototype.getPlayerIndex = function() {
      var i;

      for(i = 0; i < this.game.players.length; i++) {
        if(this.game.players[i]._id === Session.get('currentPlayer')) {
          return i;
        }
      }
    }

    gameFactory.prototype.removePlayerFromCurrentGame = function() {
      var index = this.getPlayerIndex();

      this.game.players.splice(index, 1);
      this.game.save();
    }

    return gameFactory;

  }

gameService.$inject = ['$meteor', 'MAXPLAYERS', 'EMPTYROOM'];

}(angular));
