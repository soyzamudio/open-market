'use strict';

angular.module('open-market')
  .controller('HomeCtrl', ['$rooScope', '$scope', '$state', 'Home', function($rootScope, $scope, $state, Home) {
    Home.find().then(function(response) {
      $scope.items = response.data.items;
    });
  }]);
