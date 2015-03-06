'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},
  {method: 'get', path: '/home', config: require('../routes/general/index')},

  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'post', path: '/register', config: require('../routes/users/create')},
  {method: 'post', path: '/login', config: require('../routes/users/login')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},

  {method: 'post', path: '/items/create', config: require('../routes/items/create')},
  {method: 'get', path: '/items', config: require('../routes/items/index')},
  {method: 'get', path: '/items/{itemId}', config: require('../routes/items/show')},
  {method: 'post', path: '/items/pending', config: require('../routes/items/pending')},
  {method: 'get', path: '/items/swap', config: require('../routes/items/swap')},
  {method: 'post', path: '/items/swap', config: require('../routes/items/makeSwap')}

];
