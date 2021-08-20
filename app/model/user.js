'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const userSchema = mongoose.Schema({
    id: String,
    name: String,
    dob: String,
    address: String,
    description: String, 
    avatar_url: {
      type: String,
    },
    blog: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  });
  return mongoose.model('User', userSchema);
}