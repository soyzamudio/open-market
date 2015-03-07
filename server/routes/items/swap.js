'use strict';

var Item = require('../../models/item');
var User = require('../../models/user');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId: request.auth.credentials._id, status: 'pending'}).populate('pending').exec(function(err, items) {
      Item.populate(items, {path: 'pending.userId', model: User}, function() {
        if (err) { reply().code(400); }
        else { reply({items:items}).code(200); }
      });
    });
  }
};
