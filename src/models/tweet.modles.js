/*
  Tweet Model

  _id: ObjectId
  content: String
  owner: ObjectId (ref User)
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Tweet content is required"],
      trim: true,
      maxlength: 280, // Twitter style limit
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);