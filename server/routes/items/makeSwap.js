'use strict';

var Item = require('../../models/item');
var mandrill = require('node-mandrill')(process.env.MANDRILL_KEY);
//
module.exports = {
  handler: function(request, reply) {
    Item.findOne({_id: request.payload.params.itemId}).populate('userId').exec(function(err, item) {
      Item.findOne({_id: request.payload.params.swapId}).populate('userId').exec(function(errTwo, itemTwo) {
        var itemOneUser = item.userId;
        var itemTwoUser = itemTwo.userId;

        item.userId = itemTwoUser;
        itemTwo.userId = itemOneUser;

        item.pending = [];
        itemTwo.pending = [];

        item.status = 'available';
        itemTwo.status = 'available';

        item.canSwap = false;
        itemTwo.canSwap = false;

        item.timesSwapped++;
        itemTwo.timesSwapped++;

        console.log(item.name);

        item.save(function(err){
          itemTwo.save(function(err){
            if (err) { reply().code(400); }
            else {
              mandrill('/messages/send', {
                message: {
                  to: [{email: item.userId.email, name: item.userId.name}],
                  from_email: itemTwo.userId.email,
                  subject: 'Swaped Completed!',
                  text: itemTwo.userId.name + ' accepted your swap! Now ' + item.name + ' belongs to you!'
                }
              }, function(error, response) {
                if (error) { console.log(JSON.stringify(error)); }
                else { console.log(response); }
              });
              reply().code(200);
            }
          });
        });
      });
    });
  }
};
