(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', GameCtrl);

  function GameCtrl($scope, gameService, $stateParams, $state, $timeout, $meteor, $rootScope) {
    var vm = this;
    var game;

    vm.clickable = false;
    vm.numberOfChairs = 0;

    init();

    ///////////////////////////

    function init() {
      game = new gameService($stateParams.gameId);
      game.setTimer(1000, 3000);

      $scope.$watch(timerWatcher, timerAction, true);
      $scope.$watch(chairsWatcher, chairUpdator, true);
      $scope.$watch(statusWatcher, onStatusChange, true);
    }

    function statusWatcher() {
      return game.getStatus();
    }

    function onStatusChange(newVal, oldVal) {
      if(newVal === 2) {
        gameOver();
      }
    }

    function gameOver() {
      announceWinners();
      restartGame();
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
        $timeout(toggleClickable, newVal - Date.now());
      }

      $scope.$on('chair-clicked', clickAction);
    }

    function toggleClickable() {
      vm.clickable = !vm.clickable;
    }

    function clickAction(event, args) {
      if (vm.clickable && !game.checkTakenChair(args.chairId)) {
        game.playerSitOnChair(args.chairId) == game.getParticipents() - 1 ? game.setStatus(2) : '';
        toggleClickable();
      } else if (game.checkTakenChair(args.chairId)) {
        alert('sit is taken');
      } else {
        alert('you clicked to early');
      }

    }

    function restartGame() {
      $state.go('login');
    }

    function announceWinners() {
      var i;
      var j;
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
