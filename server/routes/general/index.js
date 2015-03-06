'use strict';

var Item = require('../../models/item');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    Item.find({}, function(err, items) {
      if (err) { reply().code(400); }
      reply({items:items}).code(200);
    });
  }
};
