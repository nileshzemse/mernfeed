import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FOLLOWS_REQUEST,
  USER_FOLLOWS_SUCCESS,
  USER_FOLLOWS_FAIL,
  USER_FOLLOWS_TAGS_REQUEST,
  USER_FOLLOWS_TAGS_SUCCESS,
  USER_FOLLOWS_TAGS_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const getUserFollows = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOWS_REQUEST });

    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/follows`, config);

    dispatch({ type: USER_FOLLOWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FOLLOWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserFollowsTags = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOWS_TAGS_REQUEST });

    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/follows-tags`, config);

    dispatch({ type: USER_FOLLOWS_TAGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FOLLOWS_TAGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
