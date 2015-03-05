'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  auth: false,
  validate: {
    payload: {
      name:     Joi.string().required(),
      picture:  Joi.string().required(),
      email:    Joi.string().email(),
      password: Joi.string().min(3)
    }
  },
  handler: function(request, reply) {
    var newUser = new User(request.payload);
    User.register(newUser, function(err) {
      if (err) { reply().code(400); }
      else { reply().code(200); }
    });
  }
};
