'use strict';

angular.module('open-market')
  .controller('ItemsListCtrl', ['$rootScope', '$scope', '$state', 'Item', function($rootScope, $scope, $state, Item) {
    if (!$rootScope.name) {
      $state.go('home');
    }

    Item.find().then(function(response) {
      $scope.items = response.data.items;
    });
  }]);
