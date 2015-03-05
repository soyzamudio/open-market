/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
require('../../server/index');

describe('User', function() {
  beforeEach(function(done) {
    User.remove(function() {
      var user = new User({name: 'Emile', email: 'emile@emile.com', password: '123', picture: 'http://image.com'});
      User.register(user, done);
    });
  });

  describe('.register', function() {
    it('should register a user', function(done) {
      User.register({name: 'Jose', email: 'jose@jose.com', password: '123', picture: 'http://image.com'}, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('jose@jose.com');
        expect(user.password).to.have.length(60);
        expect(user.createdAt).to.be.instanceof(Date);
        expect(user._id).to.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });

    it('should NOT register a user - duplicate email', function(done) {
      User.register({name: 'Emile', email: 'emile@emile.com', password: '123', picture: 'http://image.com'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });

  describe('.authenticate', function() {
    it('should authenticate a user', function(done) {
      User.authenticate({email: 'emile@emile.com', password: '123'}, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('emile@emile.com');
        expect(user).to.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - wrong password', function(done) {
      User.authenticate({email: 'emile@emile.com', password: '321'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - wrong email', function(done) {
      User.authenticate({email: 'jose@jose.com', password: '123'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - wrong email and password', function(done) {
      User.authenticate({email: 'jose@jose.com', password: 'wrong'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });

});
