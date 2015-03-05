'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User;

var userSchema = mongoose.Schema({
  createdAt: {type: Date, default: Date.now, required: true},
  name:      {type: String, required: true},
  email:     {type: String, required: true},
  password:  {type: String, required: true},
  picture:   {type: String, required: true},
  Items:     [{type: mongoose.Schema.ObjectId, ref: 'Item'}]
});

userSchema.statics.register = function(o, cb) {
  User.findOne({email: o.email}, function(err,user) {
    if(user) {return cb(true);}

    user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
  });
};

userSchema.statics.authenticate = function(o, cb) {
  User.findOne({email: o.email}, function(err, user){
    if(!user) {return cb(true);}

    var isGood = bcrypt.compareSync(o.password, user.password);
    if(!isGood) {return cb(true);}

    cb(null, user);
  });
};


User = mongoose.model('User', userSchema);
module.exports = User;
