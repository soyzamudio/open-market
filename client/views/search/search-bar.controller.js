'use strict';

angular.module('open-market')
  .controller('SearchBarCtrl', ['$rootScope', '$scope', '$state', 'Home', function($rootScope, $scope, $state, Home) {
    $scope.search = function(search) {
      Home.search().then(function(response) {
        $state.go('search');
        $rootScope.search = search;
        $rootScope.searchItems = response.data.items;
      });
    };
  }]);
