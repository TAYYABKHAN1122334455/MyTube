/*
  Comment Model

  _id: ObjectId
  content: String
  owner: ObjectId   // ref User
  video: ObjectId   // ref Video
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: 1000,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },

    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, 'Video is required'],
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model('Comment', commentSchema);
