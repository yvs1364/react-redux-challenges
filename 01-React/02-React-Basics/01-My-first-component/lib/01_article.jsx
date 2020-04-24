import React from 'react';

const Article = (props) => {
  return (
    <div className="article">
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </div>
  );
};
export default Article;
