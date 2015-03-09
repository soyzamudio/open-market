'use strict';

angular.module('open-market')
.controller('UsersCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
  $scope._ = _;
  $scope.name = $scope._.capitalize($state.current.name);
  $scope.alertMessage = '';
  $scope.submit = function(user) {
    if ($scope.name === 'Register') {
      if ((user.password1 === user.password2) && (user.email)) {
        User.register({name: user.name, picture: user.picture, email: user.email, password: user.password1}).then(function(){
          $state.go('login');
        }, function(){
          user.name = user.picture = user.email = user.password1 = user.password2 = '';
        });
      } else {
        $scope.alertMessage = 'Please check the provided information';
        user.password1 = user.password2 = '';
      }
    } else {
      User.login(user).then(function(response) {
        $scope.alertMessage = '';
        $state.go('home');
        $rootScope.name = response.data.name;
      }, function() {
        $scope.alertMessage = 'Incorrect email/password';
        user.name = user.picture = user.email = user.password1 = user.password2 = user.password = '';
      });
    }
  };
}]);
