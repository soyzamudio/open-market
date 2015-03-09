/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];

describe('user route', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd: __dirname + '/../scripts'}, function(err, stdout, stderr) {
      done();
    });
  });

  describe('post /users/create', function() {
    it('should create a new user', function(done) {
      var options = {
        method:'post',
        url:'/register',
        payload: {
          email:    'new@emile.com',
          name:     'Emile',
          picture:  'http://emile.com',
          password: '123',
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('post /users/create', function() {
    it('should NOT create a new user - wrong user', function(done) {
      var options = {
        method:'post',
        url:'/register',
        payload: {
          email: 'jose@jose.m',
          picture: 'http://blah.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('post /users/create', function() {
    it('should NOT create a new user - no email', function(done) {
      var options = {
        method:'post',
        url:'/register',
        payload: {
          name: 'Jose Zamudio',
          email: '',
          picture: 'http://blah.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('post /users/create', function() {
    it('should NOT create a new user - no password', function(done) {
      var options = {
        method:'post',
        url:'/register',
        payload: {
          name: 'Jose Zamudio',
          email: 'jose@jose.me',
          picture: 'http://blah.com',
          password: ''
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('post /users/login', function() {
    it('should authenticate a user', function(done) {
      var options = {
        method:'post',
        url:'/login',
        payload: {
          email: 'jose@jose.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /users/login', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/login',
        payload: {
          email: 'other@me.me',
          password: 'wrong'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /users/login', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/login',
        payload: {
          email: '',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /users/login', function() {
    it('should NOT login user', function(done) {
      var options = {
        method:'post',
        url:'/login',
        payload: {
          email: 'jose@jose.me',
          password: ''
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

});
