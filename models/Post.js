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
    user: {
      type: Object,
      required: true,
    },
  },
  { versionKey: false, timestamps: { createdAt: "postDate", updatedAt: "updatedDate" } }
);

export default mongoose.model("Post", PostModel);
