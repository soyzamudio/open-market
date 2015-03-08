'use strict';

angular.module('open-market')
  .controller('UsersListCtrl', ['$rootScope', '$scope','User', function($rootScope, $scope,User) {

    User.find().then(function(response) {

      $scope.users = response.data.users;

    });
  }]);
