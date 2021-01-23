import axios from "axios";
import {
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
} from "../constants/feedConstants";

export const createFeed = (title, description, tags) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: FEED_CREATE_REQUEST });
    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `/api/feeds/create`,
      { title, description, tags },
      config
    );
    dispatch({ type: FEED_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEED_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFeeds = (loadMoreCount) => async (dispatch, getState) => {
  try {
    dispatch({ type: FEED_LIST_REQUEST });

    // get the users whome the login user follows and put it in state - userFollows
    const userFollows = getState().userFollows;
    let userFollowingArr = [];
    if (userFollows.userFollowing !== undefined) {
      userFollowingArr = userFollows.userFollowing;
    }
    const userFollowingJson = JSON.stringify(userFollowingArr);

    // get the tags which the login user follows and put it in state - userFollowsTags
    const userFollowsTags = getState().userFollowsTags;
    let userFollowingTagsArr = [];
    if (userFollowsTags.userFollowingTags !== undefined) {
      userFollowingTagsArr = userFollowsTags.userFollowingTags;
    }
    const userFollowingTagsJson = JSON.stringify(userFollowingTagsArr);

    // console.log(userFollowingJson);
    // console.log(userFollowingTagsJson);

    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: data_users_follows } = await axios.post(
      `/api/feeds/users/${loadMoreCount}`,
      { userFollowingJson },
      config
    );

    if (data_users_follows.feeds !== undefined) {
      data_users_follows.feeds.map((d) => {
        d.feedType = "Following User";
      });
    }

    const { data: data_tags_follows } = await axios.post(
      `/api/feeds/tags/${loadMoreCount}`,
      { userFollowingTagsJson },
      config
    );
    if (data_tags_follows.feeds !== undefined) {
      data_tags_follows.feeds.map((d) => {
        d.feedType = "Following Tag";
      });
    }

    const { data: mediumA } = await axios.get(
      `/api/feeds/medium/A/${loadMoreCount}`,
      config
    );
    if (mediumA.feeds !== undefined) {
      mediumA.feeds.map((d) => {
        d.feedType = "Medium A";
      });
    }

    const { data: mediumB } = await axios.get(
      `/api/feeds/medium/B/${loadMoreCount}`,
      config
    );
    if (mediumB.feeds !== undefined) {
      mediumB.feeds.map((d) => {
        d.feedType = "Medium B";
      });
    }

    const dataFeeds = data_users_follows.feeds.concat(
      data_tags_follows.feeds,
      mediumA.feeds,
      mediumB.feeds
    );

    const feedData = { feeds: dataFeeds };

    let loadMoreFeeds = true;
    if (loadMoreCount === 30) {
      // todo make 30 as dynamic
      loadMoreFeeds = false;
    }
    dispatch({
      type: FEED_LIST_SUCCESS,
      payload: feedData,
      loadMoreFeeds: loadMoreFeeds,
    });
  } catch (error) {
    dispatch({
      type: FEED_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
