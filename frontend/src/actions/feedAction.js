import axios from "axios";
import {
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
  FEED_PAGINATION,
  FEED_LOAD_MORE,
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

    const token = getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

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
    //////////////////////////////

    // logic to have feeds in cycle - following, Medium A ,Meduim B
    const feedPagination = getState().feedPagination;
    let {
      arrT: aarrT,
      skipF: sskipF,
      skipA: sskipA,
      skipB: sskipB,
    } = feedPagination.data;

    const {
      limitF,
      limitA,
      limitB,
      skipF,
      skipA,
      skipB,
      arrD,
      arrT,
    } = await getTypesLimitsSkips(
      token,
      userFollowingJson,
      userFollowingTagsJson,
      loadMoreCount,
      aarrT,
      sskipF,
      sskipA,
      sskipB
    );

    if (arrT.length === 0) {
      dispatch({ type: FEED_LOAD_MORE, payload: false });
      //return;
    }
    const payload = {
      arrD,
      arrT,
      skipF: skipF + parseInt(limitF),
      skipA: skipA + parseInt(limitA),
      skipB: skipB + parseInt(limitB),
    };

    dispatch({ type: FEED_PAGINATION, payload });
    // logic ends

    const { data: data_follows } = await axios.post(
      `/api/feeds/users_tags/${skipF}/${limitF}`,
      { userFollowingJson, userFollowingTagsJson },
      config
    );
    if (data_follows.feeds !== undefined) {
      data_follows.feeds.map((d) => {
        d.feedType = "Follow";
      });
    }

    // const { data: data_users_follows } = await axios.post(
    //   `/api/feeds/users/${loadMoreCount}`,
    //   { userFollowingJson },
    //   config
    // );

    // if (data_users_follows.feeds !== undefined) {
    //   data_users_follows.feeds.map((d) => {
    //     d.feedType = "Following User";
    //   });
    // }

    // const { data: data_tags_follows } = await axios.post(
    //   `/api/feeds/tags/${loadMoreCount}`,
    //   { userFollowingTagsJson },
    //   config
    // );
    // if (data_tags_follows.feeds !== undefined) {
    //   data_tags_follows.feeds.map((d) => {
    //     d.feedType = "Following Tag";
    //   });
    // }

    const { data: mediumA } = await axios.post(
      `/api/feeds/medium/A/${skipA}/${limitA}`,
      {},
      config
    );
    if (mediumA.feeds !== undefined) {
      mediumA.feeds.map((d) => {
        d.feedType = "Medium A";
      });
    }

    const { data: mediumB } = await axios.post(
      `/api/feeds/medium/B/${skipB}/${limitB}`,
      {},
      config
    );
    if (mediumB.feeds !== undefined) {
      mediumB.feeds.map((d) => {
        d.feedType = "Medium B";
      });
    }

    //const dataFeeds = data_follows.feeds.concat(mediumA.feeds, mediumB.feeds);
    //console.log(dataFeeds);
    const dataFeeds = [];
    arrD.forEach((d, n) => {
      // console.log("n=", n, d);
      let f = 0;
      let a = 0;
      let b = 0;
      if (d == "f") {
        dataFeeds.push(data_follows.feeds[f]);
        f++;
      }
      if (d == "a") {
        dataFeeds.push(mediumA.feeds[a]);
        a++;
      }
      if (d == "b") {
        dataFeeds.push(mediumB.feeds[b]);
        b++;
      }
    });

    const feedData = { feeds: dataFeeds };

    let loadMoreFeeds = true;

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

const getTypesLimitsSkips = async (
  token,
  userFollowingJson,
  userFollowingTagsJson,
  pageNo,
  aarrT,
  sskipF,
  sskipA,
  sskipB
) => {
  const num_records_per_page = 10;
  let limitF = 0;
  let limitA = 0;
  let limitB = 0;
  let skipF, skipA, skipB;
  let arrT = [];
  let arrD = [];
  if (pageNo === 1) {
    skipF = 0;
    skipA = 0;
    skipB = 0;
    arrT = ["f", "f", "a", "b"];
  } else {
    // get skip values from state
    // get arrT from state
    arrT = aarrT;
    skipF = sskipF;
    skipA = sskipA;
    skipB = sskipB;
  }

  let countF = 0;
  let countA = 0;
  let countB = 0;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (arrT.includes("f")) {
    const { data: dataF } = await axios.post(
      `/api/feeds/users_tags_count/`,
      { userFollowingJson, userFollowingTagsJson, skip: skipF },
      config
    );
    countF = dataF.count;
    // console.log("@@@@countF", countF);
  }
  if (arrT.includes("a")) {
    const { data: dataA } = await axios.post(
      `/api/feeds/medium_count/A`,
      { skip: skipA },
      config
    );
    countA = dataA.count;
    // console.log("@@@@countA", countA);
  }
  if (arrT.includes("b")) {
    const { data: dataB } = await axios.post(
      `/api/feeds/medium_count/B`,
      { skip: skipA },
      config
    );
    countB = dataB.count;
    // console.log("@@@@countB", countB);
  }

  let i = 0;
  let j;
  while (
    arrD.length <= num_records_per_page - 1 &&
    (countF > 0 || countA > 0 || countB > 0)
  ) {
    j = i < arrT.length ? i : i % arrT.length;

    if (arrT[j] === "f" && countF >= 1) {
      arrD.push(arrT[j]);
      countF--;
      limitF++;
    }
    if (arrT[j] === "a" && countA >= 1) {
      arrD.push(arrT[j]);
      countA--;
      limitA++;
    }
    if (arrT[j] === "b" && countB >= 1) {
      arrD.push(arrT[j]);
      countB--;
      limitB++;
    }

    i++;
  }

  // find absense of f or a or b in arrD - if any of f, a, b is absent in arrD
  // then remove that element from arrD and save it in a state, use it in next page
  arrT = [];
  if (countF != 0) {
    arrT.push("f");
    arrT.push("f");
  }
  if (countA != 0) {
    arrT.push("a");
  }
  if (countB != 0) {
    arrT.push("b");
  }

  // put limitF, limitA, limitB in state as skipF, skipA, skipB
  // in the function where you call testabc - find follow records as per limitF and skipF
  // find A records with limitA, SkipA
  // find B records with limitB, SkipB
  // and arrange them as per keys in arrD
  // console.log(arrD);
  // console.log(".......................");
  if (countF === 0 && countA === 0 && countB === 0) {
    //  console.log("no more data");
  }
  return {
    limitF,
    limitA,
    limitB,
    skipF: parseInt(skipF),
    skipA: parseInt(skipA),
    skipB: parseInt(skipB),
    arrD,
    arrT,
  };
};
