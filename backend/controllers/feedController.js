import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import FollowUser from "../models/followUserModel.js";
import FollowTag from "../models/followTagModel.js";
import mongoose from "mongoose";

// @route: POST: localhost:5000/api/feeds/users
// @desc: get the posts from users which login user follows
// @access: private
const getFeedsFromUsers = asyncHandler(async (req, res) => {
  //
  const { userFollowingJson } = req.body;
  const userFollowing = JSON.parse(userFollowingJson);

  const page = req.params.page ? req.params.page : 1;
  const limit = 2;

  // get users not in state, then find from db
  let arrUsers = [];
  if (userFollowing.length === 0) {
    const users = await FollowUser.findOne({ userId: req.user._id });
    if (users) {
      arrUsers = users.followsUserIds;
    }
  } else {
    arrUsers = userFollowing;
  }

  if (arrUsers.length == 0) {
    res.status(404);
    throw new Error("Users not found");
  }

  const skip = limit * page - limit;
  const feeds = await Post.find({ userId: { $in: arrUsers } })
    .populate("userId", "name email")
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");

  if (feeds) {
    res.send({ feeds: feeds });
  } else {
    res.status(404);
    throw new Error("Tags not found");
  }
});

// @route: POST: localhost:5000/api/feeds/tags
// @desc: get the posts having tags which login user follows
// @access: private
const getFeedsFromTags = asyncHandler(async (req, res) => {
  //
  const { userFollowingTagsJson } = req.body;
  const userFollowingTags = JSON.parse(userFollowingTagsJson);
  const page = req.params.page ? req.params.page : 1;
  const limit = 2;

  // get users not in state, then find from db
  let arrTags = [];
  if (userFollowingTags.length === 0) {
    const tags = await FollowTag.findOne({ userId: req.user._id });
    if (tags) {
      arrTags = tags.followsTags;
    }
  } else {
    arrTags = userFollowingTags;
  }

  if (arrTags.length == 0) {
    res.status(404);
    throw new Error("Tags not found");
  }

  const skip = limit * page - limit;
  const feeds = await Post.find({ tags: { $in: arrTags } })
    .populate("userId", "name email")
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");

  if (feeds) {
    res.send({ feeds: feeds });
  } else {
    res.status(404);
    throw new Error("Tags not found");
  }
});

// @route: POST: localhost:5000/api/feeds/users_and_tags
// @desc: get the posts from users and tags which login user follows
// @access: private
const getFeedsFromUsersTags = asyncHandler(async (req, res) => {
  //
  const { userFollowingJson } = req.body;
  const userFollowing = JSON.parse(userFollowingJson);

  const { userFollowingTagsJson } = req.body;
  const userFollowingTags = JSON.parse(userFollowingTagsJson);

  const page = req.params.page ? req.params.page : 1;
  const limit = 2;

  // get users not in state, then find from db
  let arrUsers = [];
  if (userFollowing.length === 0) {
    const users = await FollowUser.findOne({ userId: req.user._id });
    if (users) {
      arrUsers = users.followsUserIds;
    }
  } else {
    arrUsers = userFollowing;
  }

  // get users not in state, then find from db
  let arrTags = [];
  if (userFollowingTags.length === 0) {
    const tags = await FollowTag.findOne({ userId: req.user._id });
    if (tags) {
      arrTags = tags.followsTags;
    }
  } else {
    arrTags = userFollowingTags;
  }

  if (arrUsers.length === 0 && arrTags.length === 0) {
    res.send({ feeds: [] });
  }

  const skip = limit * page - limit;
  const feeds = await Post.find({
    $or: [{ userId: { $in: arrUsers } }, { tags: { $in: arrTags } }],
  })
    .populate("userId", "name email")
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");

  if (feeds) {
    res.send({ feeds: feeds });
  } else {
    res.status(404);
    throw new Error("Tags not found");
  }
});

// @route: GET: localhost:5000/api/feeds/medium/:ctype/:page
// @desc: get the posts from medium.com
// @access: private
const getFeedsFromMedium = asyncHandler(async (req, res) => {
  //
  const ctype = req.params.ctype;
  const page = req.params.page ? req.params.page : 1;
  const limit = 1;

  const skip = limit * page - limit;
  const feeds = await Post.find({
    community: "medium.com",
    ctype: ctype,
  })
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");

  if (feeds) {
    res.send({ feeds: feeds });
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// @route: GET: localhost:5000/api/feeds/tag:tag
// @desc: get the posts having tag which which is passed in GET
// @access: private
const getFeedsFromTag = asyncHandler(async (req, res) => {
  const page = req.params.page ? req.params.page : 1;
  const tag = req.params.tag ? req.params.tag : "";
  const limit = 20;

  if (tag === "") {
    res.status(404);
    throw new Error("Tag Name not found");
  }
  const skip = limit * page - limit;
  const feeds = await Post.find({ tags: new RegExp(tag, "i") })
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");

  if (feeds) {
    res.send({ feeds: feeds });
  } else {
    res.status(404);
    throw new Error("Tag not found");
  }
});

// @route: POST: localhost:5000/api/feeds/create
// @desc: create a post
// @access: private
const createFeed = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;

  const login_user_id = req.user._id;
  const postObj = {
    userId: mongoose.Types.ObjectId(login_user_id),
    title,
    description,
  };
  if (tags) {
    const arrTags = tags.split(",");
    postObj.tags = arrTags;
  }
  const post = new Post(postObj);

  const createdPost = await post.save();
  if (createdPost) {
    res.status(201);
    res.json(createdPost);
  } else {
    res.status(404);
    throw new Error("Feed not created");
  }
});

export {
  getFeedsFromUsers,
  getFeedsFromTags,
  getFeedsFromUsersTags,
  getFeedsFromMedium,
  getFeedsFromTag,
  createFeed,
};
