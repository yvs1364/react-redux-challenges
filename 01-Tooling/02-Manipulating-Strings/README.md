This folder contains a few exercises about [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). ES6 brings a lot of nice features to this class such as [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Make sure you are in the right folder and you download the necessary NPM packages before starting!

```bash
cd ~/code/<github_nickname>/react-redux-challenges
cd 01-Tooling/02-Manipulating-Strings
yarn install
```

## 1 - Dash Insertion

Let's start with a simple exercise. The goal is to implement an `insertDash(word)` function which takes a `String` as a parameter (the `word`) and returns a new `String` containing dashes between two consants.

Exemple:

```js
insertDash("hello"); // => "hel-lo"
insertDash("Le Wagon"); // => "Le Wagon"
insertDash("anticonstitutionnellement"); // => "an-ticon-s-titution-nel-lemen-t"
```

Your job is to open the `lib/01_dash_insertion.js` file and implement the method. To test it, run the following command:

```bash
yarn test
```

It will run both [`eslint`](https://eslint.org/) (for style) and [`jest`](https://facebook.github.io/jest/) (for testing). Obviously, you want to have **no style error** and **pass all the tests**!

Good luck!
