'use strict';

angular.module('open-market')
  .controller('SwapCtrl', ['$scope', '$state', 'Item', function($scope, $state, Item) {
    Item.getPending().then(function(response) {
      $scope.pending = response.data.items;
    });
  }]);
