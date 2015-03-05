'use strict';

angular.module('open-market')
  .factory('Item', ['$http', function($http) {

    function create(item) {
      return $http.post('/items/create', item);
    }
    
    return {create:create};
  }]);
