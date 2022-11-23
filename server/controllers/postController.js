const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  console.log(req.body);
  const post = new Post(req.body)
  post.save();
  res.json({});
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.body.userId }).sort({ updatedAt: -1 });
    console.log(posts)
    res.json(posts);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server error" }] });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ visibility: true }).sort({ updatedAt: -1 });
    console.log("all posts => ", posts)
    res.json(posts);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server error" }] });
  }
};

exports.saveChange = async (req, res) => {
  try {
    let { changedPosts } = req.body
    console.log("all change posts => ", req.body.changedPosts)
    for (let i = 0; i < changedPosts.length; i++) {
      await Post.updateOne(
        { _id: changedPosts[i]._id }, 
        { $set: {visibility: changedPosts[i].visibility} });
    }
    res.json({})
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server error" }] });
  }
};