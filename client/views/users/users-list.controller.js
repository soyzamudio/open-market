'use strict';

angular.module('open-market')
  .controller('UsersListCtrl', ['$rootScope', '$scope','User', function($rootScope, $scope,User) {
    // if (!$rootScope.name) {
    //   $state.go('home');
    // }
    console.log('###33333####');
    User.find().then(function(response) {
      console.log('all users YAY******');
      $scope.users = response.data.users;
      console.log('all users YAY******', + response.data.users);
    //  $scope.hasitems= response.data.items.length;
  //   console.log('There is some items?*********' + items.length);
    });
  }]);
