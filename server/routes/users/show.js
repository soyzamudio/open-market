'use strict';

var User = require('../../models/user');
var Item = require('../../models/item');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.findOne({_id:request.params.userId}, function(err, user) {
      Item.find({userId: user._id}, function(err, items) {
        if(err) { reply().code(400); }
        reply({user:user, items:items}).code(200);

      });
    });
  }
};
