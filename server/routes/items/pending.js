'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findOne({_id: request.payload.params.itemId}).populate('userId').exec(function(err, item) {
      Item.findOne({_id: request.payload.params.swapingId}).populate('userId').exec(function(errTwo, itemTwo) {
        item.pending.push(itemTwo._id);
        item.status = 'pending';
        item.save(function(err) {
          if (err || errTwo) { reply().code(400); }
          else { reply().code(200); }
        });
      });
    });
  }
};
