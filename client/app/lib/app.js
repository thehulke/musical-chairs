(function(angular) {
  console.log('main');

  // Setting const empty room value
  var emptyRoomConst = {
    gameStart: false,
    timer: 0,
    players: [],
    chairs: [],
  };

  angular.module('chairGame', ['angular-meteor', 'ui.router', 'ngAnimate'])
    .constant('MAXPLAYERS', 4)
    .constant('EMPTYROOM', emptyRoomConst);

}(angular));
