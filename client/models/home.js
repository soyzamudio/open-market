'use strict';

angular.module('open-market')
  .factory('Home', ['$http', function($http) {
    function find() {
      return $http.get('/home');
    }

    function login(user) {
      return $http.post('/login', user);
    }

    function search() {
      return $http.get('/search');
    }

    return {find:find, login:login, search: search};
  }]);
