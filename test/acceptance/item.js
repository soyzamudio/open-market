/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];

var cookie;

describe('users', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd: __dirname + '/../scripts'}, function(err, stdout, stderr) {
      var options = {
        method:'post',
        url:'/login',
        payload: {
          email: 'emile@emile.com',
          password: '123',
        }
      };
      server.inject(options, function(response) {
        cookie = response.headers['set-cookie'][0].match(/open-market-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('get /items', function() {
    it('should display the new items page', function(done) {
      var options = {
        method:'get',
        url:'/items',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.result.items[0]).to.include({description: 'car'});
        done();
      });
    });
  });

  describe('post /items/create', function() {
    it('should create the new item', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          name: 'hyundai',
          description: 'car',
          price: 200,
          image: 'http://car.com',
          category: 'transportation'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should NOT create the new item - missing name', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          name: '',
          description: 'car',
          price: 200,
          image: 'http://car.com',
          category: 'transportation'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should NOT create the new item - missing image', function(done) {
      var options = {
        method: 'post',
        url: '/items/create',
        headers: {
          cookie: cookie
        },
        payload: {
          name: 'Hyundai',
          description: 'car',
          price: 200,
          image: '',
          category: 'transportation'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('get /', function() {
    it('should get all the items', function(done) {
      var options = {
        method:'get',
        url:'/',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /show/3', function() {
    it('should show one item', function(done) {
      var options = {
        method:'get',
        url:'/items/0000000000000000000000a1',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should not show item', function(done) {
      var options = {
        method:'get',
        url:'/items/1234',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    describe('get /items/pending', function() {
      it('should add to pending', function(done) {
        var options = {
          method:'put',
          url:'/items/0000000000000000000000a1',
          headers: {
            cookie: cookie
          }
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

  });
});
