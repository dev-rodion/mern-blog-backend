import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    type: {
      type: String,
      default: "user", // or "admin"
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("User", UserSchema);
