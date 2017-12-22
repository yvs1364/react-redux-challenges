Let's create our first React component!

Make sure you are in the right folder and you download the necessary NPM packages before starting!

```bash
cd ~/code/<github_nickname>/react-redux-challenges
cd 01-React/02-React-Basics/01-My-first-component
yarn install
```

## 1 - Functional Component

The goal of this first challenge is to implement a simple `Article` **functional** component.

The following instance of `Article`:

```js
<Article title="My fancy new product" body="Test it now!" />;
```
Should produce the following HTML:

```html
<div class="article">
  <h2>My fancy new product</h2>
  <p>Test it now!</p>
</div>
```

Code your solution in `lib/01_article.jsx` and test it with `yarn test`!
