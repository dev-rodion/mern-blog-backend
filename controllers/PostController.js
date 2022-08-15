import PostModel from "../models/Post.js";
import User from "../models/User.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.json({ posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
      err,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { new: true })
      .then((doc) => {
        if (!doc)
          return res.status(500).json({
            message: "Post isn't found",
          });
        res.send(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to get a post",
          err,
        });
      });

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get a post",
      err,
    });
  }
};

export const create = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { passwordHash, ...userData } = user._doc;

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: userData,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create a new post",
      err,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId })
      .then((doc) => {
        if (!doc)
          return res.status(500).json({
            message: "Post isn't found",
          });
        return doc;
      })
      .catch((err) => {
        res.status(500).json({
          message: "Post isn't found",
          err,
        });
      });

    res.json({
      success: true,
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove the post",
      err,
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update the post",
      err,
    });
  }
};

export const getLastTags = async (req, res) => {
  const posts = await PostModel.find().limit(5).exec();

  const tags = posts
    .map((obj) => obj.tags)
    .flat()
    .filter((val, i, res) => res.indexOf(val) === i)
    .slice(0, 5);

  res.json({ tags: tags });
};
