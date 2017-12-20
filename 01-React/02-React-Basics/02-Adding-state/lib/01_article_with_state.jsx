// TODO: update dependencies if needed
import React from 'react';

// TODO: transform the following functional component into a class based component
// TODO: set the initial state { clicked: false }
// TODO: listen to the click event on `.article`
// TODO: code the `handleClick` function (which adds a 'clicked' class to the `.article`)
const Article = (props) => {
  return (
    <div className="article">
      <h2 className="article-title">{props.title}</h2>
      <p>{props.body}</p>
    </div>
  );
}

export default Article;
