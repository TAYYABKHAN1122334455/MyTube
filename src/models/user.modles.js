/*
  User Model (MongoDB + Mongoose)

  _id: ObjectId
  username: String
  email: String
  fullName: String
  avatar: String
  coverImage: String
  password: String
  refreshToken: String
  watchHistory: [ObjectId]
  createdAt: Date
  updatedAt: Date
*/

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    avatar: {
      type: String, // Cloudinary / image URL
      required: [true, "Avatar is required"],
    },

    coverImage: {
      type: String, // Cloudinary / image URL
      default: "",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

// Export Model
export const User = mongoose.model("User", userSchema);