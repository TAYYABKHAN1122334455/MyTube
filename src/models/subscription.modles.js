/*
  Subscription Model

  _id: ObjectId
  subscriber: ObjectId   // User who subscribes
  channel: ObjectId      // User being subscribed to
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Subscriber is required'],
    },

    channel: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Channel is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate subscriptions
subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
