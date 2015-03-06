'use strict';

var Item = require('../../models/item');
// var mandrill = require('node-mandrill')(process.env.MANDRILL_KEY);

module.exports = {
  handler: function(request, reply) {
    Item.findOne({_id: request.payload.params.itemId}).exec(function(err, item) {
      Item.findOne({_id: request.payload.params.swapId}).exec(function(errTwo, itemTwo) {
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

        item.save(function(err){
          itemTwo.save(function(err){
            if (err) { reply().code(400); }
            else { reply().code(200); }
          })
        })
      });
    });
  }
};




// mandrill('/messages/send', { message: {
//   to: [{email: item.userId.email, name: item.userId.name}],
//   from_email: itemTwo.userId.email,
//   subject: 'Someone want to swap for your ' + item.name + '!',
//   text: 'Jose wants to swap his ' + itemTwo.name + ' for your ' + item.name + '!\n http://localhost:3333/#/items/' + itemTwo._id
//   }
// }, function(error, response) {
//   if (error) { console.log(JSON.stringify(error)); }
//   else { console.log(response); }
// });
