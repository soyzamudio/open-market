'use strict';

angular.module('open-market')
  .controller('ItemsNewCtrl', ['$rootScope', '$scope', '$state', 'Item', function($rootScope, $scope, $state, Item) {
    if (!$rootScope.name) {
      $state.go('home');
    }

    $scope.submit = function(item) {
      Item.create(item).then(function() {
        $state.go('items.list');
      }, function() {
        $scope.item.name = $scope.item.price = $scope.item.image = $scope.item.description = $scope.item.category = '';
      });
    };
  }]);
