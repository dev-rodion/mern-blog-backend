import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    autherId: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
);

export default mongoose.model("Post", PostModel);
