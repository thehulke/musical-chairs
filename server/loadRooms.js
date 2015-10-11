Meteor.startup(function() {

  Game.remove({});

  // if (Game.find().count() === 0) {
  //   var game = [{
  //     gameStart: false,
  //     players: [{
  //       name: 'hadas',
  //     }, {
  //       name: "lior"
  //     }, {
  //       "name ": "amit "
  //     }, {
  //       "name ": "jony "
  //     }, {
  //       "name ": "yakir "
  //     }]
  //   }, {
  //     "gameStart": false,
  //     "players": [{
  //       "name": "omer "
  //     }, {
  //       "name ": "eitan "
  //     }, {
  //       "name ": "eleanor "
  //     }, {
  //       "name ": "yaniv "
  //     }]
  //   }, {
  //     "gameStart": false,
  //     "players": [{
  //       "name": "guy "
  //     }, {
  //       "name ": "matan "
  //     }, {
  //       "name ": "itay "
  //     }, {
  //       "name ": "harel "
  //     }, {
  //       "name ": "dana "
  //     }]
  //   }];
  //   for (var x = 0; x < 3; x++) {
  //     Game.insert(game[x]);
  //   }
  // }
  //
  // // console log free game
  // var z = Game.find({$where: "this.players.length === 5"}).count();
  // var indexId = Game.find({$where: "this.players.length === 5"}).fetch();
  //
  // for(y=0; y<z; y++){
  //   // modify the gamestart
  //   Game.update({ _id: String(indexId[y]._id)}, {$set: {gameStart: true}});
  // }
});
