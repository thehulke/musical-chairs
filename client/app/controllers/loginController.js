(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(gameService, $state) {
    var vm = this;

    vm.playAsGuest = function() {
      var gameId = gameService.findEmptyGame();
      var playerName = vm.playerName;
      var game;

      if (!gameId) {
        gameId = gameService.create();
      }

      game = new gameService(gameId);
      game.addPlayer({name: playerName});

      $state.go('game', {gameId: gameId});
    };
  }

  LoginCtrl.$inject = ['gameService', '$state'];

}(angular));
