'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const userSchema = mongoose.Schema({
    // '_id': String,
    // '_index': String,
    name: String,
    dob: String,
    address: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('User', userSchema);
}