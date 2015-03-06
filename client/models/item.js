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

    function acceptSwap(itemId, swapId) {
      console.log(itemId);
      console.log(swapId);
      return $http.post('/items/swap', {params:{itemId: itemId, swapId: swapId}});
    }

    return {create:create, find:find, show:show, pending:pending, getPending:getPending, acceptSwap:acceptSwap};
  }]);
