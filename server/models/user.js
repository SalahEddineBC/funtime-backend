/* eslint-disable*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
