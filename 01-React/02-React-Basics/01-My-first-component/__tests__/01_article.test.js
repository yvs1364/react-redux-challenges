import React from 'react';
import renderer from 'react-test-renderer';
import Article from '../lib/01_article.jsx';

test('Article should produce the right HTML', () => {
  const article = renderer.create(
    <Article title="My fancy new product" body="Test it now!" />
  );

  let tree = article.toJSON();
  expect(tree).toMatchSnapshot();
});
