'use strict';

var Item = require('../../models/item');
var mandrill = require('node-mandrill')(process.env.MANDRILL_KEY);

module.exports = {
  handler: function(request, reply) {
    Item.findOne({_id: request.payload.params.itemId}).populate('userId').exec(function(err, item) {
      Item.findOne({_id: request.payload.params.swapingId}).populate('userId').exec(function(errTwo, itemTwo) {
        item.pending.push(itemTwo._id);
        item.status = 'pending';
        item.save(function(err) {
          if (err || errTwo) { reply().code(400); }
          else {
            mandrill('/messages/send', { message: {
              to: [{email: item.userId.email, name: item.userId.name}],
              from_email: itemTwo.userId.email,
              subject: 'Someone want to swap for your ' + item.name + '!',
              text: 'Jose wants to swap his ' + itemTwo.name + ' for your ' + item.name + '!\n http://localhost:3333/#/items/' + itemTwo._id
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
  }
};
