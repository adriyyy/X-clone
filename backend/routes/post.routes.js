import express from "express";

import {
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  getLikedPosts,
  createPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/following", getFollowingPosts);
router.get("/user/:username", getUserPosts);
router.get("/likes/:id", getLikedPosts);

router.post("/create", createPost);
router.post("/like/:id", likeUnlikePost);
router.post("/comment/:id", commentOnPost);

router.delete("/:id", deletePost);

export default router;
