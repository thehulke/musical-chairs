(function(angular) {
  console.log('login controller');

  angular.module('chairGame')
    .controller('LoginCtrl', ['roomService', '$state', LoginCtrl]);

  function LoginCtrl(roomService, $state) {


    this.playAsGuest = function() {
      var freeRoom = roomService.findOneEmpty();
      var playerName = this.playerName;
      var gameId;

      if(!freeRoom) {
        gameId = roomService.create({gameStart: false, players: [{"name" : playerName}]});
      } else {
        gameId = freeRoom._id;
        roomService.addPlayer(freeRoom._id, {
          name: playerName
        });
      }
      $state.go('game',{id: gameId});
    };
  }



}(angular));