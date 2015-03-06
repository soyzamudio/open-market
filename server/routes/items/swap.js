'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId: request.auth.credentials._id, status: 'pending'}).populate('pending').exec(function(err, items) {
      if (err) { reply().code(400); }
      else { reply({items:items}).code(200); }
    });
  }
};
