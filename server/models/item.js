'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  createdAt:    {type: Date, default: Date.now, required: true},
  name:         {type: String, required: true},
  price:        {type: Number, required: true},
  description:  {type: String, required: true},
  image:        {type: String, required: true},
  category:     [{type: String, required: true}],
  userId:       {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  canSwap:      {type: Boolean, default: true},
  timesSwapped: {type: Number, default: 0},
  pending:      [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  status:       {type: String, default: 'available'}
});

module.exports = mongoose.model('Item', itemSchema);
