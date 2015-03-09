'use strict';

angular.module('open-market')
  .controller('HomeCtrl', ['$scope', '$state', 'Home', function($scope, $state, Home) {

    Home.find().then(function(response) {
      $scope.items = response.data.items;
      $scope.featured = [];

      for(var i = 0; i < 4; i++) {
        var idx = Math.floor(Math.random() * $scope.items.length);
        $scope.featured.push($scope.items[idx]);
        $scope.items.splice(idx, 1);
      }
    });
  }]);
