import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
    index: true, // Index for sorting by popularity
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true, // Index for faster user lookups
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for chronological sorting
  }
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrl;