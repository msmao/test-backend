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
      type: { type: String, enum: "Point", default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  });

  userSchema.indexes({ location: '2dsphere' })

  return mongoose.model('User', userSchema);
}