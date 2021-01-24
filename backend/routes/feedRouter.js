import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getFeedsFromUsers,
  getFeedsFromTags,
  getFeedsFromUsersTags,
  getFeedsFromMedium,
  getFeedsFromTag,
  createFeed,
} from "../controllers/feedController.js";

router.route("/users/:page?").post(protect, getFeedsFromUsers);
router.route("/tags/:page?").post(protect, getFeedsFromTags);
router.route("/users_tags/:page?").post(protect, getFeedsFromUsersTags);
router.route("/medium/:ctype/:page?").get(protect, getFeedsFromMedium);
router.route("/tag/:tag/:page?").get(protect, getFeedsFromTag);
router.route("/create").post(protect, createFeed);

export default router;
