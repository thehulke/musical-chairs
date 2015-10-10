  // Room.remove({});
  Meteor.startup(function() {
  if (Room.find().count() === 0) {
    var room = [{
      "gameStart": false,
      "players": [{
        "name": "hadas "
      }, {
        "name ": "lior "
      }, {
        "name ": "amit "
      }, {
        "name ": "jony "
      }, {
        "name ": "yakir "
      }]
    }, {
      "gameStart": false,
      "players": [{
        "name": "omer "
      }, {
        "name ": "eitan "
      }, {
        "name ": "eleanor "
      }, {
        "name ": "yaniv "
      }]
    }, {
      "gameStart": false,
      "players": [{
        "name": "guy "
      }, {
        "name ": "matan "
      }, {
        "name ": "itay "
      }, {
        "name ": "harel "
      }, {
        "name ": "dana "
      }]
    }];
    for (var x = 0; x < 3; x++) {
      Room.insert(room[x]);
    }
  }

  // console log free room
  var z = Room.find({$where: "this.players.length === 5"}).count();
  var indexId = Room.find({$where: "this.players.length === 5"}).fetch();

  for(y=0; y<z; y++){
    // modify the gamestart
    Room.update({ _id: String(indexId[y]._id)}, {$set: {gameStart: true}});
  }
});
