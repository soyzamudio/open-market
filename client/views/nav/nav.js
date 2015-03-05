'use strict';

angular.module('open-market')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
    $scope.logout = function() {
      User.logout().then(function() {
        $rootScope.name = '';
        $state.go('home');
      });
    };
  }]);
