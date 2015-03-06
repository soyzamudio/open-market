'use strict';

angular.module('open-market')
  .factory('Item', ['$http', function($http) {

    function create(item) {
      return $http.post('/items/create', item);
    }

    function find() {
      return $http.get('/items');
    }

    function show(itemId) {
      return $http.get('/items/' + itemId);
    }

    function pending(itemId, swapingId) {
      return $http.post('/items/pending', {params:{itemId: itemId, swapingId: swapingId}});
    }

    function getPending() {
      return $http.get('/items/swap');
    }

    return {create:create, find:find, show:show, pending:pending, getPending:getPending};
  }]);
