(function(angular) {

  angular.module('chairGame')
    .factory('roomService', ['$meteor', roomService]);

  function roomService($meteor) {
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
      var randTimeOut = (Math.random() * (max - min)) + min;
      console.log(randTimeOut);
      var timeOutDate = Math.round((new Date()).getTime() / 1000);
      console.log(timeOutDate);
      return Room.update(roomId, {timer: timeOutDate + randTimeOut});
    }

    function getParticipents() {
      var room = $meteor.object(Room, roomId);
      return room.players.length;
    }

    function enterRoom(newRoomId) {
      roomId = newRoomId;
    }

    function findEmpty() {
      return $meteor.collection(Room, {gameStart: false,});
    }

    function findOneEmpty() {
      return $meteor.collection(Room, {gameStart: false,})[0];
    }

    function create(roomDetails) {
      Session.set('currentPlayer', roomDetails.players[0]._id);
      console.log(Session.get('currentPlayer'));
      return Room.insert(roomDetails);
    }

    function addPlayer(roomId, playerDetails) {

      var room = $meteor.object(Room, roomId);
      var player = playerDetails;
      player._id = Random.id();

      if (room.players.length >= 4) {
        room.gameStart = true;
      }

      Session.set('currentPlayer', player._id);
      room.players.push(player);

      return room;
    }

  }

}(angular));
