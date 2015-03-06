'use strict';

angular.module('open-market')
  .controller('ItemsShowCtrl', ['$scope', '$state', 'Item', function($scope, $state, Item) {

    Item.show($state.params.itemId).then(function(response) {
      $scope.item = response.data.item;
      $scope.userItems = response.data.items;
      console.log(response.data.items);
    });

    $scope.pending = function(itemId, swapingId) {
      Item.pending(itemId, swapingId).then(function() {
        $state.go('home');
      }, function(response) {
        console.log(response);
      });
    };
  }]);
