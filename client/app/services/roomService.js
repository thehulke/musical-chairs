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
      var randTimeOut = (Math.random() * (max - min)) + min;
      console.log(randTimeOut);
      var timeOutDate = Math.round((new Date()).getTime() / 1000);
      console.log(timeOutDate);
      return Room.update(roomId, {timer: timeOutDate + randTimeOut});
    }

    function getParticipents() {
      // var room = Room.findOne({_id:roomId});
      // return 1;
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
      Session.set('currentPlayer', roomDetails.players[0]._id);
      console.log(Session.get('currentPlayer'));
      return Room.insert(roomDetails);
    }

    function addPlayer(roomId, playerDetails) {

      var room = Room.findOne({
        _id: roomId,
      });
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
