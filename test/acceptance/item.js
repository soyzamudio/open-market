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
        expect(response.result.items[0]).to.include({name: 'honda'});
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
  });

});
