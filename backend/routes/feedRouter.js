import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getFeedsFromUsers,
  getFeedsFromTags,
  getFeedsFromMedium,
  getFeedsFromTag,
  createFeed,
} from "../controllers/feedController.js";

router.route("/users/:page?").post(protect, getFeedsFromUsers);
router.route("/tags/:page?").post(protect, getFeedsFromTags);
router.route("/medium/:ctype/:page?").get(protect, getFeedsFromMedium);
router.route("/tag/:tag/:page?").get(protect, getFeedsFromTag);
router.route("/create").post(protect, createFeed);

export default router;
