'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findOne({_id: request.payload.params.itemId}).populate('userId').exec(function(err, item) {
      Item.findOne({_id: request.payload.params.swapId}).populate('userId').exec(function(errTwo, itemTwo) {
        item.pending.splice(item.pending.indexOf(itemTwo._id), 1);
        item.status = 'available';
        item.save(function(err){
          itemTwo.save(function(err){
            if (err) { reply().code(400); }
            else { reply().code(200); }
          });
        });
      });
    });
  }
};
