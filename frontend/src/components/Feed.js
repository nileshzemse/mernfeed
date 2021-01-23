import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Feed = ({ feed, userFollows }) => {
  return (
    <Card className="mt-10">
      <Card.Body>
        <Card.Title>
          <b>{feed.title}</b>
        </Card.Title>
        <Card.Text>{feed.description}</Card.Text>
        <Card.Text>
          {feed.tags
            ? feed.tags.map((tag) => <Link to={`/tag/${tag}`}># {tag} </Link>)
            : ""}
        </Card.Text>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">
            <cite>{feed.userId.name}</cite>
          </footer>
        </blockquote>
        {userFollows.userFollowing &&
        !userFollows.userFollowing.includes(feed.userId._id) ? (
          <Button className="mt-10" variant="primary">
            Follow
          </Button>
        ) : (
          <Button className="mt-10" variant="primary">
            Unfollow
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Feed;