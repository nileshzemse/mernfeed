import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  getUserFollows,
  getUserFollowsTags,
  followUser,
  followTag,
} from "../controllers/userController.js";

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/follows").get(protect, getUserFollows);
router.route("/follows-tags").get(protect, getUserFollowsTags);
router.route("/follow-user").post(protect, followUser);
router.route("/follow-tag").post(protect, followTag);

export default router;
