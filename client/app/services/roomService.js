(function(angular) {

  angular.module('chairGame')
    .factory('roomService', [roomService]);

  function roomService() {
    service = {
      findEmpty: findEmpty,
      create: create,
      addPlayer: addPlayer,
      findOneEmpty: findOneEmpty

    };

    return service;

    ////////////////////////////

    function findEmpty() {
      return Room.find({
        gameStart: false
      }).fetch();
    }

    function findOneEmpty() {
      return Room.findOne({
        gameStart: false
      });
    }

    function create(roomDetails) {
      Session.set('currentPlayer',roomDetails.players[0]._id);
      console.log(Session.get('currentPlayer'));
      return Room.insert(roomDetails);
    }

    function addPlayer(roomId, playerDetails) {

      var room = Room.findOne({_id:roomId});
      var player = playerDetails;
      player._id = Random.id();
      if(room.players.length >= 4) {
        room.gameStart = true;
      }
      Session.set('currentPlayer',player._id);
      console.log(Session.get('currentPlayer'));
      room.players.push(player);

      return Room.update(roomId, room);
    }

  }

}(angular));
