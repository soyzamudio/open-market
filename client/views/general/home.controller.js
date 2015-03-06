'use strict';

angular.module('open-market')
  .controller('HomeCtrl', ['$scope', '$state', 'Home', function($scope, $state, Home) {
    Home.find().then(function(response) {
      $scope.items = response.data.items;
    });
  }]);
