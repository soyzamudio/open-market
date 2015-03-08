'use strict';

var Item = require('../../models/item');

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    Item.findOne({_id: request.params.itemId}).populate('userId').exec(function(err, item) {
      if (request.auth.credentials) {
        Item.find({userId: request.auth.credentials._id}).populate('userId').exec(function(errTwo, items) {
          items.forEach(function(element, i) {
            var index = item.pending.indexOf(element._id);
            if (index >= 0) {
              items.splice(i, 1);
            }
          });
          if (err) {
            reply().code(400);
          } else {

            reply({item:item, items:items});
          }
        });
      } else {
        if (err) {
          reply().code(400);
        } else {
          reply({item:item});
        }
      }
    });
  }
};
