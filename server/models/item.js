'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var AWS = require('aws-sdk');
var path = require('path');
var async = require('async');

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

function uploadIterator(photo, cb) {
  var s3 = new AWS.S3();
  var file = photo.hapi.filename;
  var ext = path.extname(file);
  var base = path.basename(file, ext);
  base = _.kebabCase(base);
  ext = ext.toLowerCase();
  file = this._id + '/' + base + ext;
  var url = 'https://' + process.env.AWS_BUCKET + '.s3.amazonaws.com/' + file;
  this.photos.push(url);

  var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: photo._data, ACL: 'public-read'};
  s3.putObject(params, cb);
}

itemSchema.methods.upload = function(photos, cb) {
  async.each(photos, uploadIterator.bind(this), cb);
};

module.exports = mongoose.model('Item', itemSchema);
