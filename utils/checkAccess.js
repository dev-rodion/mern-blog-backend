import User from "../models/User.js";
import Post from "../models/Post.js";

export default async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  const userId = req.userId;
  const userIsAuther = post.autherId === userId;

  if (userIsAuther) return next();

  const user = await User.findOne({ _id: userId });
  const userIsAdmin = user.type === "admin";

  if (userIsAdmin) return next();

  res.res.status(500).json({
    error: "You don't have access to delete this post",
  });
};
