import mongoose from "mongoose";

const followUserSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followsUserIds: [],
  },
  { timestamps: true, collection: "follow_users" }
);

const FollowUser = mongoose.model("FollowUser", followUserSchema);

export default FollowUser;
