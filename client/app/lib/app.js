(function(angular) {
  console.log('main');

  // Setting const empty room value
  var emptyRoomConst = {
    gameStart: false,
    timer: false,
    players: []
  };

  angular.module('chairGame', ['angular-meteor', 'ui.router', 'ngAnimate', 'ngCookies'])
    .constant('EMPTYROOM', emptyRoomConst);

}(angular));
