'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const authorizationSchema = mongoose.Schema({
    provider: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      default: false
    },
  });
  return mongoose.model('Authorization', authorizationSchema);
}