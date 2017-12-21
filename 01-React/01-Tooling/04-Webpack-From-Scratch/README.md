To save time, in all lectures + exercises of this week, we will start from **boilerplates**. A boilerplate is a set of folder and files already configured so that you can start coding right away. Many boilerplates exist covering all combination of permutation in the (ES6, Babel, Webpack, etc.) set. At Le Wagon, we made our own: [webpack-boilerplate](https://github.com/lewagon/webpack-boilerplate)

The goal of this exercise is to, at once, start **from scratch** and see how the different pieces are glued together.

```bash
cd ~/code/<github_nickname>/react-redux-challenges
cd 01-React/01-Tooling/04-Webpack-From-Scratch
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

```js
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

```js
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

We have four HTTP requests served by the Webpack Dev Server:

1. The first one serves `/` with the `index.html` file.
2. The second one is the `dist/bundle.js` file compiled by Webpack. Open [its source](http://localhost:8080/dist/bundle.js)! There's a lot in here, if you scroll at the very bottom, you will find **your code**. The reason why there is so much is that by default, `webpack-dev-server` serves a **development** bundle, with debugging information.
3. The third one is `/sockjs-node/info`, a request to ask the Webpack Dev Server about configuration. Is the HMR (Hot Module Replacement) enabled?
4. Yes it is! A websocket (fourth request) is opened and maintained with the server. Put your Sublime Text and Chrome side by side. You can change the code in Sublime, Save, and **without reloading**, the Chrome tab will be updated.

Try this: remove existing code from `src/index.js` and replace it with:

```js
// src/index.js
document.body.innerHTML = "Hello world";
```

Try changing the string and save. See how it hot reloads in the browser 💥 ?

## [Babel](https://babeljs.io)

ES6 is now supported by more than [95% of browsers](http://kangax.github.io/compat-table/es6/), still may want to support the remaining 5%. To do that, we need Babel. Babel will **compile** our ES6 code into ES5, the previous version of JavaScript.

To add Babel to your Node.js project, run this:

```bash
yarn add babel-core babel-preset-es2015 --dev

# Create a Babel config file with:
echo '{ "presets": [ "es2015" ] }' > .babelrc

# For webpack
yarn add babel-loader --dev 
```

Then configure Webpack to use babel:

```js
// webpack.config.js

  // [...]
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
  // [...]
```

Let's try this out. Open your `src/index.js` file and update it with some ES6 fat arrow:

```js
// src/index.js
const sayHello = () => {
  document.body.innerHTML = "Hello world";
};

sayHello();
```

Now, open [localhost:8080/dist/bundle.js](http://localhost:8080/dist/bundle.js) and scroll to the very bottom.
 What do you see? ES5! Babel works 👌

You can try a more complex example. Let's create a `Greeter` class:

```js
// src/index.js
class Greeter {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    document.body.innerHTML = `Hello ${this.name}!`;
  }
}

const greeter = new Greeter("Boris");
greeter.sayHello();
```

Have a look at how Babel compiles this ES6 code into ES5 with `function`.

## Debugging

The Google Chrome **Source** tab works really well with this Webpack setup thanks to [**Source maps**](http://blog.teamtreehouse.com/introduction-source-maps). Remember, Webpack is only serving **one** file, `dist/bundle.js`, with a lot of code that we don't wrote. If there is an exception in the code, or if you add `debugger`, you want to only see your code!

Well, try it! Go ahead and add a `debugger` as the first line of the `sayHello()` function. See? You get **your** ES6 source code displayed, not the compiled version. You can even use `Cmd` + `P` to navigate through files:

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/webpack/webpack_chrome_source_tab.gif)

Navigating to a file is handy when you want to add a **Breakpoint**. This acts like a `debugger` in the code, but is handled in Chrome without you changing the code. To add a breakpoint, navigate to a file, and click in the gutter on the left (with the line numbers). A little blue rectangle will appear. Reload the page, and the JavaScript execution will halt at this breakpoint.

That's it! If you have questions on one piece of this architecture, please ask a TA! You can play a bit with Webpack and ES6, try to change some HTML through JavaScript. Let's have lunch and start with the first React lecture this afternoon.
