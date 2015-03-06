'use strict';

angular.module('open-market')
  .factory('Item', ['$http', function($http) {

    function create(item) {
      return $http.post('/items/create', item);
    }

    function find() {
      return $http.get('/items');
    }

    return {create:create, find:find};
  }]);
