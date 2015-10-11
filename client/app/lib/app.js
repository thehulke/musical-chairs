(function(angular) {
  console.log('main');

  // Setting const empty game value
  var emptyGameConst = {
    status: 0,
    timer: 0,
    players: [],
    chairs: [],
  };

  angular.module('chairGame', ['angular-meteor', 'ui.router', 'ngAnimate'])
    .constant('MAXPLAYERS', 2)
    .constant('EMPTYROOM', emptyGameConst);

}(angular));
