import {
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_CREATE_RESET,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
  FEED_PAGINATION,
  FEED_LOAD_MORE,
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
      const arr = state.feeds.concat(action.payload.feeds);
      return {
        loading: false,
        feeds: arr,
      };
    case FEED_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        feeds: [],
      };
    default:
      return state;
  }
};

export const feedPaginationReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case FEED_PAGINATION:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};

export const feedLoadMoreReducer = (state = { status: true }, action) => {
  switch (action.type) {
    case FEED_LOAD_MORE:
      return {
        status: action.payload,
      };
    default:
      return state;
  }
};
