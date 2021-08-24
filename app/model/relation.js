'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const relationSchema = mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    is_mutual: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  });
  return mongoose.model('Relation', relationSchema);
}