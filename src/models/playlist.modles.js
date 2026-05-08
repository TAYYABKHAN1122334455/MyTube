/*
  Playlist Model

  _id: ObjectId
  name: String
  description: String
  videos: [ObjectId]   // array of Video IDs
  owner: ObjectId      // ref User
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from 'mongoose';

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Playlist name is required'],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
    },

    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Playlist = mongoose.model('Playlist', playlistSchema);
