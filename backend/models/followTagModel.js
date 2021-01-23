import mongoose from "mongoose";

const followTagSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followsTags: [],
  },
  { timestamps: true, collection: "follow_tags" }
);

const FollowTag = mongoose.model("FollowTag", followTagSchema);

export default FollowTag;
