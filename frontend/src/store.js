import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userFollowsReducer,
  userFollowsTagsReducer,
} from "./reducers/userReducers";

import { feedCreateReducer, feedListReducer } from "./reducers/feedReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userFollows: userFollowsReducer,
  userFollowsTags: userFollowsTagsReducer,
  feedCreate: feedCreateReducer,
  feedList: feedListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
