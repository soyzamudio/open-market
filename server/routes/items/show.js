'use strict';

var Item = require('../../models/item');

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    Item.findOne({_id: request.params.itemId}).populate('pending').exec(function(err, item) {
      Item.find({userId: request.auth.credentials._id}).populate('userId').exec(function(errTwo, items) {
        if (errTwo || err) { reply().code(400); }
        else { reply({item:item, items:items}); }
      });
    });
  }
};
