import dotenv from "dotenv";
import connectDB from "./config/db.js";

import users from "./data/users.js";
import globalTags from "./data/globalTags.js";
import postsN from "./data/postsN.js";
import postsP from "./data/postsP.js";
import postsMedium from "./data/postsMedium.js";
import postsM from "./data/postsM.js";

import User from "./models/userModel.js";
import GlobalTag from "./models/globalTagModel.js";
import Post from "./models/PostModel.js";
import FollowUser from "./models/followUserModel.js";
import FollowTag from "./models/followTagModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await GlobalTag.deleteMany();
    await Post.deleteMany();
    await FollowUser.deleteMany();
    await FollowTag.deleteMany();

    await GlobalTag.insertMany(globalTags);

    const createdUsers = await User.insertMany(users);

    //////////////////////// Posts
    const nilesh = createdUsers[1]._id;
    const pranamya = createdUsers[2]._id;
    const mugdha = createdUsers[3]._id;
    const jovita = createdUsers[4]._id;

    const postsByNilesh = postsN.map((post) => {
      return { ...post, userId: nilesh };
    });
    await Post.insertMany(postsByNilesh);

    const postsByPranamya = postsP.map((post) => {
      return { ...post, userId: pranamya };
    });
    await Post.insertMany(postsByPranamya);

    const postsByMugdha = postsM.map((post) => {
      return { ...post, userId: mugdha };
    });
    await Post.insertMany(postsByMugdha);

    await Post.insertMany(postsMedium);
    ////////////////////////

    ///////////////////////follow users
    const nileshFollows = [];
    nileshFollows.push(pranamya, mugdha, jovita);
    const folllow1 = {
      userId: nilesh,
      followsUserIds: nileshFollows,
    };
    await FollowUser.insertMany(folllow1);

    const jovitaFollows = [];
    jovitaFollows.push(pranamya, mugdha, nilesh);
    const folllow2 = {
      userId: jovita,
      followsUserIds: jovitaFollows,
    };
    await FollowUser.insertMany(folllow2);

    /////////////////////////////////

    ////////////////////////////////follow tags
    const arrFollowsTags1 = [];
    const arrFollowsTags2 = [];
    arrFollowsTags1.push("Apple");
    arrFollowsTags1.push("Kanya");
    arrFollowsTags2.push("Women");
    arrFollowsTags2.push("Google");
    const folllowTags1 = {
      userId: nilesh,
      followsTags: arrFollowsTags1,
    };
    const folllowTags2 = {
      userId: jovita,
      followsTags: arrFollowsTags2,
    };
    await FollowTag.insertMany(folllowTags1);
    await FollowTag.insertMany(folllowTags2);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Data import Error = ", error);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await GlobalTag.deleteMany();
    await Post.deleteMany();
    await FollowUser.deleteMany();
    await FollowTag.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log("Data import Error = ", error);
  }
};

if (process.argv[2] === "-D") {
  await destroyData();
} else {
  await importData();
}
