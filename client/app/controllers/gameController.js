(function(angular) {
  console.log('game controller');

  angular.module('chairGame')
    .controller('GameCtrl', ['roomService', GameCtrl]);

    function GameCtrl(roomService) {

    }


}(angular));
