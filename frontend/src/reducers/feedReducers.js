import {
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_CREATE_RESET,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
} from "../constants/feedConstants";

export const feedCreateReducer = (state = { feed: {} }, action) => {
  switch (action.type) {
    case FEED_CREATE_REQUEST:
      return {
        loading: true,
      };
    case FEED_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        feed: action.payload,
      };
    case FEED_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        feed: {},
      };
    case FEED_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const feedListReducer = (state = { feeds: [] }, action) => {
  switch (action.type) {
    case FEED_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FEED_LIST_SUCCESS:
      return {
        loading: false,
        feeds: action.payload.feeds,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case FEED_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
