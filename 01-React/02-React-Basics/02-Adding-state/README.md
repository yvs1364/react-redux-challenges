We just created our first `Article` component 💪

Let's enhance it now by adding state and event handling to it!

Make sure you are in the right folder and download the necessary NPM packages before starting!

```bash
cd ~/code/<github_nickname>/react-redux-challenges
cd 01-React/02-React-Basics/02-Adding-state
yarn install
```

## 1 - Adding state

In this challenge, let's create our first **class-based** React component.

Open `lib/01_article_with_state.jsx` in Sublime and follow the instructions.

This time, we want our component to have a `clicked` piece of state storing a boolean.
Any time a user clicks on the `.article` div, the CSS `clicked` class should be added / removed to the `div` depending on its previous state.

### Hints

Initial state should be defined in the `constructor()`.

You should always use `this.setState()` to update a component's state.

Don't forget to bind `this` to events callback functions!
