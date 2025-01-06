const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  contestId: {
    type: Number,
    required: true,
  },
  contestName: {
    type: String,
    required: true,
  },
  contestStartTime: {
    type: Date,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  notificationScheduled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
