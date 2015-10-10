(function(angular) {

  angular.module('chairGame')
    .config(['$stateProvider', '$urlRouterProvider', router]);

  function router ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      controllerAs: 'login',
      templateUrl: 'client/app/views/loginTemplate.ng.html'
      })
      .state('game', {
        url: '/game/:id',
        controller: 'GameCtrl',
        controllerAs: 'game',
        templateUrl: 'client/app/views/gameTemplate.ng.html'
      });
    }

}(angular));
