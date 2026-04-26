/*
  Like Model

  _id: ObjectId
  user: ObjectId (ref User)
  video: ObjectId   // optional
  comment: ObjectId // optional
  tweet: ObjectId   // optional
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: null,
    },

    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);