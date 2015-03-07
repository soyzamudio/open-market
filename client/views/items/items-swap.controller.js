'use strict';

angular.module('open-market')
  .controller('SwapCtrl', ['$scope', '$state', 'Item', function($scope, $state, Item) {
    Item.getPending().then(function(response) {
      $scope.pending = response.data.items;
      console.log($scope.pending);
    });

    $scope.acceptSwap = function(itemId, swapId) {
      // alert('21 BITCHES!');
      console.log('ItemID:', itemId);
      console.log('SwapID:', swapId);
      Item.acceptSwap(itemId, swapId).then(function() {
        $state.go('home');
      }, function() {
        console.log('cannot swap');
      });
    };
  }]);
