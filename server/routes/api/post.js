const express = require("express");
const router = express.Router();

const postController = require("../../controllers/postController");

router.post("/create-post", postController.createPost);
router.post("/get-my-posts", postController.getMyPosts);
router.get("/get-all-posts", postController.getAllPosts);
router.post("/toggle-visibility", postController.saveChange);

module.exports = router;
