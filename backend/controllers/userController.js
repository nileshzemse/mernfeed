import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import FollowUser from "../models/followUserModel.js";
import FollowTag from "../models/followTagModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// @route: POST: localhost:5000/api/users/login
// @desc: Auth user and get a token
// @access: public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // test error response
  // res.status(401)
  // throw new Error('Not Authorised')

  if (user) {
    const matchedPass = await user.matchPassword(password);
    if (matchedPass) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid username or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @route: GET: localhost:5000/api/users/profile
// @desc: get user profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route: GET: localhost:5000/api/users/follows/
// @desc: get userIds followed by login user
// @access: private
const getUserFollows = asyncHandler(async (req, res) => {
  const users = await FollowUser.findOne({ userId: req.user._id });
  if (users) {
    res.json(users.followsUserIds);
  } else {
    res.json([]);
  }
});

// @route: GET: localhost:5000/api/users/follows-tags/
// @desc: get tags followed by login user
// @access: private
const getUserFollowsTags = asyncHandler(async (req, res) => {
  const tags = await FollowTag.findOne({ userId: req.user._id });
  if (tags) {
    res.json(tags.followsTags);
  } else {
    res.json([]);
  }
});

// @route: POST: localhost:5000/api/users/follow-user/
// @desc:login user will follow the userId coming in post request
// @access: private
const followUser = asyncHandler(async (req, res) => {
  const { follow_user_id } = req.body;
  if (follow_user_id) {
    const FollowUserDbData = await FollowUser.findOne({ userId: req.user._id });
    const followsUserIds = FollowUserDbData.followsUserIds;

    // if followUserId exists in FollowUserDbData.followsUserIds then do nothing
    // else push it in FollowUserDbData.followsUserIds
    if (followsUserIds.includes(follow_user_id)) {
      res.json({ error: "Already Following" });
    } else {
      const userExists = await User.findById(follow_user_id);
      if (userExists) {
        FollowUserDbData.followsUserIds.push(
          mongoose.Types.ObjectId(follow_user_id)
        );
        await FollowUserDbData.save(FollowUserDbData);
        res.json({
          msg: "Added this user in follow list",
          followsUserIds: FollowUserDbData.followsUserIds,
        });
      } else {
        res.status(404);
        throw new Error("Follow User Id not found");
      }
    }
  } else {
    res.status(404);
    throw new Error("Follow User Id not found");
  }
});

// @route: POST: localhost:5000/api/users/follow-tag/
// @desc:login user will follow the tag coming in post request
// @access: private
const followTag = asyncHandler(async (req, res) => {
  const { tag_name } = req.body;
  if (tag_name) {
    const followTagDbData = await FollowTag.findOne({ userId: req.user._id });
    const followsTags = followTagDbData.followsTags;

    // if tag_name exists in followTagDbData.followsTags then do nothing
    // else push it in followTagDbData.followsTags
    if (followsTags.includes(tag_name)) {
      res.json({ error: "Already Following" });
    } else {
      followTagDbData.followsTags.push(tag_name);
      await followTagDbData.save(followTagDbData);
      res.json({
        msg: "Added this tag in follow list of login user",
        followsTags: followTagDbData.followsTags,
      });
    }
  } else {
    res.status(404);
    throw new Error("Follow Tag Name not found");
  }
});

export {
  authUser,
  getUserProfile,
  getUserFollows,
  getUserFollowsTags,
  followUser,
  followTag,
};
