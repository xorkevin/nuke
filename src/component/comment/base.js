import React, {Fragment, useState, useCallback} from 'react';
import Container from '../container';
import Anchor from '../anchor/text';
import AS from '../anchor/secondary';
import Button from '../button/small';
import Time from '../time';

const Comment = ({
  depth,
  id,
  username,
  score,
  time,
  content,
  childComments,
}) => {
  const [hidden, setHidden] = useState(false);
  const toggleHidden = useCallback(() => setHidden((h) => !h), [setHidden]);

  return (
    <div className="comment">
      <div className="inner">
        <div className="info">
          <span className="data hide">
            <Button onClick={toggleHidden}>
              [{(hidden && <span>+</span>) || <span>&minus;</span>}]
            </Button>
          </span>
          <span className="data username">
            <Anchor>{username}</Anchor>
          </span>
          <span className="data">
            <span>{score} points</span> <Time value={time} />
          </span>
        </div>
        {!hidden && (
          <Fragment>
            <div className="content">{content}</div>
            <div className="options">
              <span>
                <AS href={id}>link</AS>
              </span>
              <span>
                <AS>source</AS>
              </span>
              <span>
                <AS>reply</AS>
              </span>
              <span>
                <AS>report</AS>
              </span>
            </div>
          </Fragment>
        )}
      </div>
      {!hidden && Array.isArray(childComments) && (
        <div className="children">
          {(depth > 0 &&
            childComments.map(
              ({id, username, score, time, content, children}) => (
                <Comment
                  key={id}
                  depth={depth - 1}
                  id={id}
                  username={username}
                  score={score}
                  time={time}
                  content={content}
                  childComments={children}
                />
              ),
            )) || (
            <span>
              <Anchor>continue &gt;</Anchor>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const DEPTH = 12;

const CommentSection = ({comments}) => {
  return (
    <Container padded narrow>
      <h5>Comments</h5>
      <div className="comment-section">
        {(Array.isArray(comments) &&
          comments.map(({id, username, score, time, content, children}) => (
            <Comment
              key={id}
              depth={DEPTH - 1}
              id={id}
              username={username}
              score={score}
              time={time}
              content={content}
              childComments={children}
            />
          ))) || <span>No comments</span>}
      </div>
    </Container>
  );
};

export {CommentSection as default, Comment, CommentSection};
