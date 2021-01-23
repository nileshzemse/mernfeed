import mongoose from "mongoose";

const globalTagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "global_tags" }
);

const GlobalTag = mongoose.model("GlobalTag", globalTagSchema);

export default GlobalTag;
