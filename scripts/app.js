var myApp = angular.module('myApp',['ui.router']);



myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/partial-home.html',
            controller: function ($scope, $stateParams, $rootScope) {
            
            }  
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('tiles', {
            url: '/tiles',
            templateUrl: 'partials/partial-tiles.html',
            params: {'data': null},
            controller: 'TileController'
                   
        })

        
});


myApp.controller('MainController', function($scope) {
  $scope.greeting = 'Hola!';
});
