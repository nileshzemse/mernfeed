import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import Feed from "../../components/Feed";
import { getUserFollows, getUserFollowsTags } from "../../actions/userAction";
import { createFeed, listFeeds } from "../../actions/feedAction";
// import { Link } from "react-router-dom";

const HomeScreen = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loadMoreCount, setLoadMoreCount] = useState(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // set the state, so that api can make use of state, instead of
  // geting data from db again and again
  const userFollows = useSelector((state) => state.userFollows);
  useSelector((state) => state.userFollowsTags);

  const feedCreate = useSelector((state) => state.feedCreate);
  const { loading, error, success } = feedCreate;

  const feedList = useSelector((state) => state.feedList);
  const { loading: loadingFeedList, feeds, loadMoreFeeds } = feedList;

  useEffect(() => {
    if (!userInfo || !userInfo._id) {
      history.push("/login");
    }

    // get the users whome the login user follows and put it in state - userFollows
    dispatch(getUserFollows());

    // get the tags which the login user follows and put it in state - userFollowsTags
    dispatch(getUserFollowsTags());

    // get feeds
    dispatch(listFeeds(1));
    setLoadMoreCount(loadMoreCount + 1);
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (title !== "" && description !== "") {
      dispatch(createFeed(title, description, tags));
      setTitle("");
      setDescription("");
      setTags("");
    }
  };

  const loadMoreHandler = () => {
    setLoadMoreCount(loadMoreCount + 1);
    dispatch(listFeeds(loadMoreCount));
  };

  return (
    <>
      <Meta
        title="Feeder App | Home"
        keywords="Feeder,Follow Users,Follow Tags"
        description="Feeder App, follow people, read their feeds"
      />
      <Row>
        <Col md={3}>Left Side</Col>
        <Col md={9}>
          <div className="formContainer">
            {loading ? <Loader /> : ""}
            {error ? <Message variant="danger">{error}</Message> : ""}
            {success ? (
              <Message variant="success">Feed Created Successfully.</Message>
            ) : (
              ""
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>

          <div className="feedContainer">
            {feeds ? (
              feeds.map((feed, i) => (
                <div key={feed._id + i}>
                  <Feed feed={feed} userFollows={userFollows}></Feed>
                </div>
              ))
            ) : (
              <p>No feeds</p>
            )}
          </div>

          {loadMoreFeeds ? (
            <div className="loadMoreFeedsBtn">
              {loadingFeedList ? <Loader /> : ""}
              <Button variant="primary" onClick={loadMoreHandler}>
                Load More...
              </Button>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
