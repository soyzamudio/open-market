'use strict';

angular.module('open-market')
  .controller('ItemsNewCtrl', ['$scope', '$state', 'Item', function($scope, $state, Item) {
    $scope.submit = function(item) {
      Item.create(item).then(function() {
        $state.go('items.list');
      }, function() {
        $scope.item.name = $scope.item.price = $scope.item.image = $scope.item.description = $scope.item.category = '';
      });
    };
  }]);
