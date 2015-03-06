'use strict';

angular.module('open-market')
  .controller('ItemsListCtrl', ['$scope', '$state', 'Item', function($scope, $state, Item) {
    Item.find().then(function(response) {
      $scope.items = response.data.items;
    });
  }]);
