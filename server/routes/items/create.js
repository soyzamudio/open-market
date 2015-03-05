'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      name:        Joi.string().required(),
      price:       Joi.number().required(),
      image:       Joi.string().required(),
      category:    Joi.string().required(),
      description: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    console.log(request.payload);
    request.payload.userId = request.auth.credentials._id;
    var item = new Item(request.payload);
    item.save(function(err) {
      if (err) { reply().code(400); }
      reply(item).code(200);
    });
  }
};
