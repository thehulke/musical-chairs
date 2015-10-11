(function(angular) {
  console.log('main');

  // Setting const empty game value
  var emptyGameConst = {
    gameStart: false,
    timer: 0,
    players: [],
    chairs: [],
  };

  angular.module('chairGame', ['angular-meteor', 'ui.router', 'ngAnimate'])
    .constant('MAXPLAYERS', 4)
    .constant('EMPTYROOM', emptyGameConst);

}(angular));
