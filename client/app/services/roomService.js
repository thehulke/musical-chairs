(function(angular) {

  angular.module('chairGame')
    .factory('roomService', [roomService]);

  function roomService() {
    var roomId;

    service = {
      enterRoom: enterRoom,
      findEmpty: findEmpty,
      create: create,
      addPlayer: addPlayer,
      findOneEmpty: findOneEmpty,
      getParticipents: getParticipents,
      setTimer: setTimer,
      getTimer: getTimer,
    };

    return service;

    ////////////////////////////

    function getTimer() {
      //
    }

    function setTimer(min, max) {
      //
    }

    function getParticipents() {
      //
    }

    function enterRoom(newRoomId) {
      roomId = newRoomId;
    }

    function findEmpty() {
      return Room.find({
        gameStart: false,
      }).fetch();
    }

    function findOneEmpty() {
      return Room.findOne({
        gameStart: false,
      });
    }

    function create(roomDetails) {
      return Room.insert(roomDetails);
    }

    function addPlayer(roomId, playerDetails) {

      var room = Room.findOne({_id:roomId});
      var player = playerDetails;
      player._id = Random.id();

      if (room.players.length >= 4) {
        room.gameStart = true;
      }

      Session.set('currentPlayer', player._id);
      room.players.push(player);

      return Room.update(roomId, room);

    }

  }

}(angular));
