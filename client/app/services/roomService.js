(function(angular) {

  angular.module('chairGame')
    .factory('roomService', ['$meteor', 'MAXPLAYERS', roomService]);

  function roomService($meteor, MAXPLAYERS) {
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
      getRoomId: getRoomId,
    };

    return service;

    ////////////////////////////

    function getTimer() {
      //
    }

    function setTimer(min, max) {
      var room = $meteor.object(Room, roomId, false);
      var randTimeOut = (Math.random() * (max - min)) + min;
      var timeOutDate = Date.now();
      if (room.gameStart) {
        room.timer = Math.floor(timeOutDate + randTimeOut);
        room.save();
      }

    }

    function getParticipents() {
      var room = $meteor.object(Room, roomId);
      return room.players.length;
    }

    function enterRoom(newRoomId) {
      roomId = newRoomId;
    }

    function findEmpty() {
      return $meteor.collection(Room, {
        gameStart: false,
      });
    }

    function findOneEmpty() {
      return $meteor.object(Room, {
        gameStart: false,
      }, false);
    }

    function create(roomDetails) {
      Session.set('currentPlayer', roomDetails.players[0]._id);
      return Room.insert(roomDetails);
    }

    function addPlayer(roomId, playerDetails) {
      var room = $meteor.object(Room, roomId, false);
      var player = playerDetails;
      player._id = Random.id();

      if (room.players.length >= MAXPLAYERS - 1) {
        room.gameStart = true;
      }

      Session.set('currentPlayer', player._id);
      room.players.push(player);

      room.save();
      return room;
    }

    function getRoomId() {
      return roomId;
    }
  }

}(angular));
