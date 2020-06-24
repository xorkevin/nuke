import React from 'react';
import {Grid, Column} from '../grid';
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
        <Grid className="author" strict nowrap align="center">
          {author.img && (
            <Column className="image">
              <ImgCircle
                src={author.img}
                preview={author.imgpreview}
                size="fill"
              />
            </Column>
          )}
          <Column className="description" shrink="1">
            <h4 className="name">{author.name}</h4>
            <div className="bio">{author.bio}</div>
          </Column>
        </Grid>
      </div>
    </article>
  );
};

export default Article;
