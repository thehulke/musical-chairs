(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', GameCtrl);

  function GameCtrl($scope, gameService, $stateParams, $state, $timeout, $meteor, $rootScope) {
    var vm = this;
    var game;
    var activeAction = false;
    var isGameOver = false;

    vm.clickable = false;
    vm.numberOfChairs = 0;

    init();

    ///////////////////////////

    function init() {
      game = new gameService($stateParams.gameId);
      game.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
      $scope.$watch(chairsWatcher, chairUpdator, true);
      $timeout(statusChange, 10);
    }

    function statusChange() {
      if(game.getStatus() === 2) {
        gameOver();
      }

      $timeout(statusChange, 10);
    }

    function gameOver() {
      if(!isGameOver) {
        announceWinners();
        restartGame();
        isGameOver = true;
      }
    }

    function chairsWatcher() {
      return game.getParticipents();
    }

    function chairUpdator(newVal, oldVal) {
      vm.numberOfChairs = newVal - 1;
    }

    function timerWatcher() {
      return game.getTimer();
    }

    function timerAction(newVal, oldVal) {
      if (newVal > 0) {
        game.setStatus(1);
        $timeout(function(){ vm.clickable = true; }, newVal - Date.now());
      }

      $scope.$on('chair-clicked', clickAction);
    }

    function clickAction(event, args) {
      if(!activeAction) {
        activeAction = true;

        if (vm.clickable && !game.checkTakenChair(args.chairId)) {
          if (game.playerSitOnChair(args.chairId) == game.getParticipents() - 1) {
            game.setStatus(2);
          }
          vm.clickable = false;
        } else if (game.checkTakenChair(args.chairId)) {
          alert('sit is taken');
        } else {
          alert('you clicked to early');
        }

        $timeout(function(){activeAction = false;}, 10)
      }

    }

    function restartGame() {
      $state.go('login');
    }

    function announceWinners() {
      var winner = game.checkIfPlayerWin();

      if (winner) {
        alert('you win!');
      } else {
        alert('you lose :(');
        game.removePlayerFromCurrentGame();
      }

    }
  }

  GameCtrl.$inject = ['$scope', 'gameService', '$stateParams', '$state', '$timeout', '$meteor', '$rootScope'];

}(angular));
