'use strict';

angular.module('open-market', ['ui.router', 'file-model'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', { url: '/', templateUrl: '/views/general/home.html', controller: 'HomeCtrl' })

      .state('register', { url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl' })
      .state('login', { url: '/login', templateUrl: 'views/users/users.html', controller: 'UsersCtrl' })

      .state('items', { url: '/items', templateUrl: 'views/items/items.html', abstract: true })
      .state('items.new', { url: '/new', templateUrl: 'views/items/items-new.html', controller: 'ItemsNewCtrl' })
      .state('items.list', { url: '', templateUrl: 'views/items/items-list.html', controller: 'ItemsListCtrl' })
      .state('items.show', { url: '/{itemId:[0-9a-f]{24}}', templateUrl: 'views/items/items-show.html', controller: 'ItemsShowCtrl'})
      .state('items.swap', { url: '/swap', templateUrl: 'views/items/items-swap.html', controller: 'SwapCtrl'})

      .state('search', { url: '/search', templateUrl: 'views/search/search.html', controller: 'SearchCtrl'});
  }])
  .run(['$rootScope', 'User', function($rootScope, User) {
    User.status().then(function(response) {
      console.log(response.data.name);
      $rootScope.name = response.data.name;
      $rootScope.id = response.data.id;
    });
  }]);
