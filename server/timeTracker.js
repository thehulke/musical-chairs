Meteor.methods({
    set_timer: function(gameId, dueDate) {
      var gameId = gameId;

      Meteor.setTimeout(function() {
        var game = Game.findOne(gameId);
        game.status = 2;
        Game.update(gameId, game);

      }, dueDate - Date.now())
    },
});
