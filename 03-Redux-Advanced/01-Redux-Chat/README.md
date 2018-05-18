# Redux chat

Today, we'll continue to tame Redux with a new challenge: building a **multi-channel messaging application**, just like Slack! Here is the wanted final result 👇

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-chat.png)

## Getting started

### 1. Setup

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

### 2. Components / Containers

Think about how you will split this app. **Take a paper and a pencil ✏️**, and try to draw the components.

Done?

<details><summary>View solution</summary><p>

👉 Here's [our proposal](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-chat-components.png) (⚠️ Do not click on this link right away! Try to do it yourself before 🙏)

</p></details>



### 3. Redux state tree

Before diving into the code, let's think about the **Redux state**. We need to:

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

<details><summary>View solution</summary><p>

👉 Here's [our state proposal](https://gist.github.com/ssaunier/3b54ca3ba961e6f979a64d2302c1cd0e)  (⚠️ Again, do not click right away!)

</p></details>

### 4. Reducers

For every key in the state, create a reducer and add it to the `combineReducers()` call. Every reducer can start with the [identity](https://en.wikipedia.org/wiki/Identity_function) reducer:

```js
export default function(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

We will soon add action handling to some of them.

### 5. Redux middlewares

Now that you are familiar with Redux, know that in a real-life project, we always have to make AJAX calls. Also, we like to have actions logged in the console. That's why we'll always install these two middlewares:

- [redux-logger](https://github.com/evgenyrodionov/redux-logger)
- [redux-promise](https://github.com/acdlite/redux-promise)


## Single Channel app

### 1. Rendering a fake list of messages

For this morning, we will ignore the `state.channels` and won't try to build the `<ChannelList />` container. Let's focus on what we need to have a nice list of messages. Let's try to make it pretty as well.

Implement the following:

1. `<Message />` (component)
1. `<MessageList />` (container)

Don't bother with actions in the beginning. Connect your `<MessageList />` component to redux and set the `initialState.messages` to:

```json

[
  {
    "author":"anonymous92",
    "content":"Hello world!",
    "created_at":"2017-09-26T23:03:16.365Z"
  },
  {
    "author":"anonymous77",
    "content":"My name is anonymous77",
    "created_at":"2017-09-26T23:03:21.194Z"
  }
]
```

This way, the `mapStateToProps()` method in `<MessageList />` will have some effect.

### 2. Fetching messages from the API

Time to create your first action! We need a `fetchMessages(channel)` that will be called in the `MessageList.componentWillMount()` lifecycle method. The channel to use will be taken from the redux state.

The API you need to call is [documented here](https://github.com/lewagon/wagon-chat-api#wagon-chat-api-documentation).

Here's a hint:

```js
fetch('https://wagon-chat.herokuapp.com/general/messages');
```

This action should return an action with a payload that will be resolved by the `ReduxPromise` middleware!

### 3. Posting a message.

Before call the API to post a new message, we need a new container. That would be `<MessageForm />`. It will contain a form with an `<input />` and a `<button />` to submit it. The input should be a [controlled component](https://facebook.github.io/react/docs/forms.html) with a `handleChange` function updating the **react** state of the component. This way, it's easy to read the value and to reset the value of the input to `''` just after the form submission.

Implement an `handleSubmit` function which will call a new action creator:

```js
// src/actions/index.js
export function createMessage(channel, author, content) {
  // TODO
}
```

Implement this action and the reducers to update the message list. Remember that reducers should return a **new** object. To create a copy of an existing array, you can run:

```js
const beatles = [ 'john', 'paul', 'ringo' ];
let newBeatles = beatles.slice(0);
newBeatles.push('george');
return newBeatles;  // `newBeatles` is a different array than `beatles`
```

The action creator should **call the [API](https://github.com/lewagon/wagon-chat-api#post-a-comment-post-channelmessages)**. To send a `POST` request to a JSON API with `fetch`, you can run:

```js
const body = { key: value, key2: value2, etc: 'etc...' };
const promise = fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(r => r.json());
```

### 4. Updating messages every X seconds

You may now have noticed that you don't automatically get new messages from your buddy unless your **reload** the page. We'd like new messages to appear automatically! We won't dive into a Websocket or ActionCable implementation, we'll rely on the good old school technique of [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).

In the `<MessageList />`, implement an interval in the `componentDidMount()` method and [clear](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) it in the `componentWillUnmount()` (that's a good practise). This interval should trigger the `fetchMessages(channel)` action.

### 5. Scrolling the message list

When you get too many messages, the list does not auto scroll to the bottom. That's quite annoying. To fix that, we can use the `scrollHeight` property of the message list DOM element, and set it to the `scrollTop` property.

The problem is: how do I get the DOM element from within a React component? [That's how you do it](https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element).

Where should you set the `scrollTop`? Look at the [component lifecycle methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) and choose wisely.

## Multi Channels app

OK, time to handle several channels and a channel switch!

### 1. Add the `<ChannelList />` container

Remember this container? We chose to ignore it until now. This container will get the `channels` and `selectedChannel` from the Redux state and print a nice list, with the selected channel outlined (in bold for instance, like in the screenshot above).

### 2. Changing the selected channel

Once the `<ChannelList />` container is working, add a new `selectChannel(channel)` action. This action will be triggered when clicking on one of the channels in the list. Go back to the relevant reducers and implement a reaction to this action.

### 3. Testing

You want to validate all these user stories before declaring victory :tada:

1. [ ] On page load, the browser prompts me for a username
1. [ ] After the username prompt, the chat loads with a default channel selected. Messages appear and scroll down to the most recent
1. [ ] Focus is set on message box on load
1. [ ] I can type a message and post it. It instantly appears right above the message box, and the message box clears. Focus is kept on message box
1. [ ] When I post a message, it's under the username I set on page load
1. [ ] When I click on another channel, the messages from the previous one disappear, and the messages from the newly selected channel appear

## Bonus

### 1. Colorize usernames

You may have noticed that Slack assigns a color to a username. You can replicate this behavior showcased in the screenshot above. [This StackOverflow thread](https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript) will help you.

### 2. Emojis

Have a look at [react-emojione](https://www.npmjs.com/package/react-emojione). Try to add it to the project and use it in the `<Message />` component.

### 3. Deploy :tada:

Don't forget to deploy your chat to GitHub Pages :)
