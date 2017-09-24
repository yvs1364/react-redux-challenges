=-To save time, in all lectures + exercises of this week, we will start from **boilerplates**. A boilerplate is a set of folder and files already configured so that you can start coding right away. Many boilerplates exist covering all combination of permutation in the (ES6, Babel, Webpack, etc.) set. At Le Wagon, we made our own: [webpack-boilerplate](https://github.com/lewagon/webpack-boilerplate)

The goal of this exercise is to, at once, start **from scratch** and see how the different pieces are glued together.

```bash
cd ~/code/<github_nickname>/react-redux-challenges
cd 01-Tooling/04-Webpack-From-Scratch
```

💡 Notice there were no `yarn install` as the folder does not contain any `package.json`

## Initializing a Node project with [yarn](https://yarnpkg.com/lang/en/)

The first thing you need is a `package.json` file. You can generate one with the following interactive command:

```bash
yarn init
```

## [ESlint](https://eslint.org/)

Linting the code is an important step to keep your code clean and please your teammates. That's the first package you should always add to a new project:

```bash
yarn add eslint --dev
eslint --init # Use Airbnb, no react (yet). Store as json
rm package-lock.json # we already have yarn.lock
```

To tweak the ESlint rules to your own taste, you can open the `.eslintrc.json`. Here is a configuration we like:

```json
{
  "extends": "airbnb-base",
  "rules": {
    "comma-dangle": "off",
    "quotes": "off",
    "arrow-body-style": 0,
    "space-before-function-paren": 0
  },
  "env": {
    "browser": true
  }
}
```

Create a first `src/index.js` file and write a JS function which will `alert('Hello world')`. You can run the linter with:

```bash
eslint src/index.js
```

See what we have here? A linter warning. By default, ESLint [recommends not to use this UI feature](https://eslint.org/docs/rules/no-alert). It's up to us to **temporarly disable** this rule from the source file or add a rule in the `.eslintrc.json`. Your choice!

```js
/* eslint no-alert: "off" */
```

```json
// [...]
  "rules": {
    "no-alert": "off",
    // [...]
  }
// [...]
```

## [Webpack](https://webpack.js.org/)

Webpack will help us bundle every javascript file together to produce a neat bundled file. This is something Rails also does thanks to the [Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html).

```bash
yarn add webpack webpack-dev-server --dev
```

Let's have a look at the `.bin` folder of our project:

```bash
ll node_modules/.bin
```

😱 Pfiou! That's a lot! We'll use `eslint`, `webpack` and `webpack-dev-server`. You can convince yourself that writing `eslint` actually uses the binary in that folder thanks to the `$PATH`:

```bash
type -a eslint
type -a webpack
type -a webpack-dev-server
```

Great, now we need to configure Webpack, and have a default HTML entry point. To do that, you need two files at the root of the project:

- `index.html`
- `webpack.config.js`

You can get a basic config [in this gist](https://gist.github.com/ssaunier/0490d2093b9f72ba67024410bfb30915).

Now you can launch the dev server with:

```bash
webpack-dev-server
```

🚀 Yeah! Open a new Chrome tab and go to [localhost:8080](http://localhost:8080). You should get an alert!

Awesome. Let's have a look at Webpack internals through the Browser inspector. If you open it, and go to the Network tab, you get this:

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/webpack/webpack_chrome_network_tab.png)


