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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userFollowsReducer = (state = { userFollowing: [] }, action) => {
  switch (action.type) {
    case USER_FOLLOWS_REQUEST:
      return {
        loading: true,
      };
    case USER_FOLLOWS_SUCCESS:
      return {
        loading: false,
        userFollowing: action.payload,
      };
    case USER_FOLLOWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userFollowsTagsReducer = (
  state = { userFollowingTags: [] },
  action
) => {
  switch (action.type) {
    case USER_FOLLOWS_TAGS_REQUEST:
      return {
        loading: true,
      };
    case USER_FOLLOWS_TAGS_SUCCESS:
      return {
        loading: false,
        userFollowingTags: action.payload,
      };
    case USER_FOLLOWS_TAGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
