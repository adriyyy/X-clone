import express from "express";
import {
  getUserProfile,
  getSuggestedUsers,
  updateUserProfile,
  followUnfollowUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/suggested", getSuggestedUsers);
router.post("/update", updateUserProfile);
router.post("/follow/:id", followUnfollowUser);

export default router;
