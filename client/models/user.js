'use strict';

angular.module('open-market')
  .factory('User', ['$http', function($http) {

    function register(user) {
      return $http.post('/register', user);
    }

    function login(user) {
      return $http.post('/login', user);
    }

    function status() {
      return $http.get('/status');
    }

    function logout() {
      return $http.delete('/logout');
    }

    function find() {
      return $http.get('/users');

    }

    function show(userId) {
      return $http.get('/users/' + userId);
    }



    return {register:register, login:login, status:status, logout:logout, find:find, show:show};

  }]);
