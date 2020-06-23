import React from 'react';
import Chip from '../chip';
import Time from '../time';
import ImgCircle from '../image/circle';

const Article = ({title, subtitle, author, time, tags, children}) => {
  return (
    <article>
      <h1 className="title">{title}</h1>
      {subtitle && <h3 className="subtitle">{subtitle}</h3>}
      <span className="info">
        {author.name} | <Time value={time} />
      </span>
      {children}
      <span className="info">
        {Array.isArray(tags) && tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
      </span>
      <hr />
      <div>
        <div className="author">
          {author.img && (
            <div className="image">
              <ImgCircle
                src={author.img}
                preview={author.imgpreview}
                size="fill"
              />
            </div>
          )}
          <div className="description">
            <h4 className="name">{author.name}</h4>
            <div className="bio">{author.bio}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
