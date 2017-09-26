# Redux chat

Today, we'll continue to tame Redux with a new challenge: building a **multi-channel messaging application**, just like Slack! Here is the wanted final result 👇

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-chat.png)

## 1. Setup

Once again, we will start from the [Redux boilerplate](https://github.com/lewagon/redux-boilerplate).

```bash
cd ~/code/<github_username>

# Download boilerplate to new project `chat-redux`
git clone git@github.com:lewagon/redux-boilerplate.git chat-redux
cd chat-redux

# Destroy existing boilerplate git history, and start a new one
rm -rf .git
git init
git add .
git commit -m "Initial commit with boilerplate"

# Create a GitHub repo, and push!
hub create
git push origin master

# Install the dependencies listed in the `package.json` file with:
yarn install

# Time to open Sublime Text and code.
stt
```

Launch a `webpack-dev-server` and open a browser at `http://localhost:8080`!

## 2. Components / Containers

Think about how you will split this app. **Take a paper and a pencil ✏️**, and try to draw the components.

Done?

👉 Here's [our proposal](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-chat-components.png) (⚠️ Do not click on this link right away! Try to do it yourself before 🙏)

## 3. Redux state tree

Before diving into the code, let's thing about the **Redux state**. We need to:

1. Store a list of messages
1. Store a list of channels
1. Store the selected channel
1. Store the current username

Open your `src/index.jsx` and try to implement the relevant `initialState`:

```js
const initialState = {
  // TODO
};
```

💡 Before storing the username, you may need to [prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) the user!

Done?

👉 Here's [our state proposal](https://gist.github.com/ssaunier/3b54ca3ba961e6f979a64d2302c1cd0e)  (⚠️ Again, do not click right away!)
