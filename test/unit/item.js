/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var Item = require('../../server/models/item');
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
require('../../server/index');

describe('Item', function() {
  beforeEach(function(done) {
    Item.remove();
    User.remove(function() {
      var user = new User({name: 'Emile', email: 'emile@emile.com', password: '123', picture: 'http://image.com'});
      User.register(user, done);
    });
  });

  describe('Item', function() {
    it('should create am item', function(done) {
      User.findOne({email: 'emile@emile.com'}, function(err, user) {
        var item = new Item({name: 'Guitar', price:200, description: 'Big description', image: 'http://image.com', userId: user._id, category: 'Muisc'});
        expect(item.name).to.equal('Guitar');
        expect(item.price).to.equal(200);
        expect(item.createdAt).to.be.instanceof(Date);
        expect(item.userId).to.be.ok;
        expect(item).to.be.ok;
        done();
      });
    });
    
  });
});
