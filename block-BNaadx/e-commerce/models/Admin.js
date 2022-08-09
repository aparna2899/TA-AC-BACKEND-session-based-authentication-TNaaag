var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

adminSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

adminSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
