'use strict';

var User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.findOne({_id:request.params.userId}, function(err, user) {
      console.log('****User***');
      if(err) { reply().code(400); }
      reply({user:user}).code(200);
    });
  }
};
