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

export const listFeeds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FEED_LIST_REQUEST });
    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/feeds/users`, config);
    /*
    const { data } = await axios.get(
      `/api/feeds/tags`,
      config
    );

    const { data } = await axios.get(
      `/api/feeds/medium/A`,
      config
    );

    const { data } = await axios.get(
      `/api/feeds/medium/B`,
      config
    );*/

    dispatch({ type: FEED_LIST_SUCCESS, payload: data });
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
