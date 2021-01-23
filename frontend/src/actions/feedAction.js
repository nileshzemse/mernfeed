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
    // console.log(userFollows.userFollowing);

    // get the tags which the login user follows and put it in state - userFollowsTags
    const userFollowsTags = getState().userFollowsTags;
    // console.log(userFollowsTags.userFollowingTags);

    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: data_users_follows } = await axios.get(
      `/api/feeds/users/${loadMoreCount}`,
      config
    );

    const { data: data_tags_follows } = await axios.get(
      `/api/feeds/tags/${loadMoreCount}`,
      config
    );

    const { data: mediumA } = await axios.get(
      `/api/feeds/medium/A/${loadMoreCount}`,
      config
    );

    const { data: mediumB } = await axios.get(
      `/api/feeds/medium/B/${loadMoreCount}`,
      config
    );

    const dataFeeds = data_users_follows.feeds.concat(
      data_tags_follows.feeds,
      mediumA.feeds,
      mediumB.feeds
    );

    const feedData = { feeds: dataFeeds };

    let loadMoreFeeds = true;
    if (loadMoreCount == 30) {
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
