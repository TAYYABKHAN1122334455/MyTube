/*
  Video Model

  _id: ObjectId
  videoFile: String
  thumbnail: String
  title: String
  description: String
  duration: Number
  views: Number
  isPublished: Boolean
  owner: ObjectId (ref User)
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from 'mongoose';

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, 'Video file is required'],
      trim: true,
    },

    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required'],
      trim: true,
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const Video = mongoose.model('Video', videoSchema);
