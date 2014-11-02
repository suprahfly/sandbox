(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'particlesHeader'
  ]);

  angular
    .module('app')
    .config(['$routeProvider', '$locationProvider', config]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        title: 'main'
      })
      .when('/particles', {
        templateUrl: 'particles.html',
        title: 'Particles'
      })
      .otherwise({redirectTo: '/'});

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

  }
}());