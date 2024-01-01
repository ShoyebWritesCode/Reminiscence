const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  profile_image: {
    type: String,
    default: '',
  },
  audio: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', UserSchema);
