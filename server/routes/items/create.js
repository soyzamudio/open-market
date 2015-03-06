'use strict';

var Item = require('../../models/item');
var Joi = require('joi');
var _ = require('lodash');

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
    request.payload.userId = request.auth.credentials._id;
    var category = request.payload.category.split(',');
    category = category.map(function(e) {
      return _.kebabCase(e);
    });

    console.log(category);

    request.payload.category = category;

    var item = new Item(request.payload);
    console.log(item);
    item.save(function(err) {
      if (err) { reply().code(400); }
      reply(item).code(200);
    });
  }
};
