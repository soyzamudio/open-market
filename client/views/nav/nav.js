'use strict';

angular.module('open-market')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
    $scope.logout = function() {
      User.logout().then(function() {
        $rootScope.name = '';
        $scope.user.email = $scope.user.password = '';
        $state.go('home');
      });
    };

    $scope.login = function(user) {
      User.login(user).then(function(response) {
        $state.go('home');
        $rootScope.name = response.data.name;
      }, function() {
        user.email = user.password = '';
      });
    };
  }]);
