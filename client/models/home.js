'use strict';

angular.module('open-market')
  .factory('Home', ['$http', function($http) {
    function find() {
      return $http.get('/home');
    }

    return {find:find};
  }]);
