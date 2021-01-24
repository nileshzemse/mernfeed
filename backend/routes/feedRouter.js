import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getFeedsFromUsers,
  getFeedsFromTags,
  getFeedsFromUsersTags,
  getFeedsFromUsersTagsCount,
  getFeedsFromMedium,
  getFeedsFromMediumCount,
  getFeedsFromTag,
  createFeed,
} from "../controllers/feedController.js";

router.route("/users/:page?").post(protect, getFeedsFromUsers);
router.route("/tags/:page?").post(protect, getFeedsFromTags);

router.route("/users_tags_count/").post(protect, getFeedsFromUsersTagsCount);
router.route("/users_tags/:skip/:limit").post(protect, getFeedsFromUsersTags);

router.route("/medium_count/:ctype?").post(protect, getFeedsFromMediumCount);
router.route("/medium/:ctype/:skip/:limit").post(protect, getFeedsFromMedium);

router.route("/tag/:tag/:page?").get(protect, getFeedsFromTag);
router.route("/create").post(protect, createFeed);

export default router;
