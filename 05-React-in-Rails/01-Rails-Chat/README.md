# Rails Chat

The goal of our last day is to build a connected chat application with Rails 5.1 and the [webpacker](https://github.com/rails/webpacker) gem. This app will be protected by a Devise sign in, so no more anonymous user chatting!

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/chat-rails-redux-paris-channel.png)

## Setup

Make sure you have the latest `rails` installed, on a Ruby 2.4+ environment:

```bash
rbenv versions # Do you have 2.4+?
gem install rails
rails -v # Do you have 5.1+?
```

Then you can generate a new rails app with the [Le Wagon Devise template](https://github.com/lewagon/rails-templates#devise):

```bash
cd ~/code/<github_nickname>
rails new \
  --database postgresql \
  --webpack=react \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  chat-rails-redux
cd chat-rails-redux
```

Make sure you can start the rails app:

```bash
rails s
```

And navigate to [localhost:3000](http://localhost:3000). Ready?

## Back-end

Let's start with Rails. The goal is to implement the database to store messages and channels. We also need to provide an API for the front-end, as Redux action creators will need to retrieve some information from Rails.

### Models

Let's start with our database schema. Here is the bare minimum that we need for the application.

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/chat-rails-redux-schema.png)

The `users` table is already there thanks to the Rails template. Your job is to create the other models and run the migrations.

💡 Open your models and add some back-end validations! For instance, a message should not have a blank content!

### Seed

Create a `db/seeds.rb` file which:

1. Destroy messages, users and channels (in that order)
1. Create some channels (`general`, `paris`, `react` for instance)
1. Create some users (needs email / password)
1. Create some messages in several channels.

Then run it:

```bash
rails db:migrate
```

### Routes

Here are the routes we need to implement:

```ruby
namespace :api, defaults: { format: :json } do
  namespace :v1 do
    resources :channels, only: [] do
      resources :messages, only: [ :index, :create ]
    end
  end
end

resources :channels, only: [ :show ]
root to: 'channels#show'
```

Go ahead and copy/paste them to your `config/routes.rb` file, then run the following command:

```bash
rails routes | grep -v user
```

❓ Do you understand why we need those four routes? Can you explain why? If not, talk to your buddy about it, then ask a TA.

### Controllers

Let's start with the API:

```bash
rails g controller api/v1/messages index create  --skip-template-engine --skip-routes
```

Go ahead and implement the `index` first.

- You need a `before_action` to retrieve the `Channel` model. Retrieve by `name`, not id.
- For the `index` action, render the list of messages [as json](http://guides.rubyonrails.org/layouts_and_rendering.html#rendering-json)

To test those controllers, you can launch the `rails s` and open your browser to [localhost:3000](http://localhost:3000). Log-in then:

Go to [localhost:3000/api/v1/channels/general/messages](http://localhost:3000/api/v1/channels/general/messages). Do you see a JSON? It should look like this, to help you with the React part:

```json
[
  {
    "id": 1,
    "author": "ssaunier",
    "content": "Welcome to #general!",
    "created_at": "2017-09-28T19:05:00.094Z"
  },
  {
    "id": 2,
    "author": "edward",
    "content": "Hello mates :wave:",
    "created_at": "2017-09-28T19:05:00.105Z"
  }
]
```

⚠️If you just render the `@messages` as a JSON, it won't look like this ☝️, you need to work on some transformation to get the data right 😉


We'll leave the `create` action for later. You can go ahead.

Let's now create a regular controller for your Rails app:

```bash
rails g controller channels show --skip-routes
```

and put the following into this file:

```ruby
# app/controllers/channels_controller.rb
class ChannelsController < ApplicationController
  def show
    if params[:id].blank?
      redirect_to channel_path(Channel.first.name)
    else
      @channel = Channel.find_by(name: params[:id])
      @channels = Channel.all
    end
  end
end
```

You should have a boilerplate view when going to [`localhost:3000/channels/general`](http://localhost:3000/channels/general).

## Front-end

### Importing existing React app

We won't start from scratch on this one, we already have a nice [lewagon/chat-redux](https://github.com/lewagon/chat-redux) repo ready to be used. Let's use it!

Let's start with CSS:

```bash
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/assets/stylesheets/application.scss > app/assets/stylesheets/components/_chat.scss
echo '@import "chat";' >> app/assets/stylesheets/components/_index.scss
```

Then, let's import the Javascript part:

```bash
# in your terminal:

mkdir app/javascript/chat # This is where the React+Redux app will now live.
mkdir app/javascript/chat/actions
mkdir app/javascript/chat/components
mkdir app/javascript/chat/containers
mkdir app/javascript/chat/reducers

yarn add react-emojione redux react-redux redux-logger redux-promise

# Actions
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/actions/index.js > app/javascript/chat/actions/index.js

# Containers
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/containers/channel_list.jsx > app/javascript/chat/containers/channel_list.jsx
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/containers/message_form.jsx > app/javascript/chat/containers/message_form.jsx
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/containers/message_list.jsx > app/javascript/chat/containers/message_list.jsx

# Components
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/components/app.jsx > app/javascript/chat/components/app.jsx
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/components/message.jsx > app/javascript/chat/components/message.jsx

# Reducers
curl https://raw.githubusercontent.com/lewagon/chat-redux/master/src/reducers/messages_reducer.js > app/javascript/chat/reducers/messages_reducer.js
```

OK, almost there. Let's have a look at the existing [src/index.jsx](https://github.com/lewagon/chat-redux/blob/master/src/index.jsx). Can you see the Redux state? It contains 4 keys:

1. `messages`: storing the list of message of the current selected channel
2. `channels`: the list of channels, hard-coded
3. `currentUser`: the current username, again, hard-coded with a `prompt()` at page load
4. `selectedChannel`: the current active channel

We needed this because we were building a stand-alone React+Redux app with no real login. Now that we have a Rails with Devise, it's not the same. The "current user" concept lives in a cookie! This means that we can **get rid of `currentUser` in the state**.

While we're at it, let's think about the `selectedChannel`. In the current app, we stored it in the state to be able to change it on click. Let's have a look at the Rails routes again:

```bash
rails routes | grep channels#show
```

See? The selected channel information will **now live in the URL**. So we can also drop the `selectedChannel` from the Redux state and use the `react-router` node module.

OK, this is now what you should put in your `app/javascript/chat/index.jsx`

```bash
yarn add react-router-dom
touch app/javascript/chat/index.jsx
```

```js
// app/javascript/chat/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import messagesReducer from './reducers/messages_reducer';

const chatContainer = document.getElementById('chat_app');

const initialState = {
  messages: [],
  channels: [ 'general', 'react', 'paris' ], // TODO: get that from Rails DB.
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: (state = null, action) => state
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/channels/:channel" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  chatContainer
);
```

It's now time to bind this `app/javascript/chat` react app with the `webpacker` gem. First we need to create a new **pack** that Rails will be aware of:

```bash
touch app/javascript/packs/chat.js
```

In this pack, we will just import the `app/javascript/chat/index.jsx` React root file:

```js
// app/javascript/packs/chat.js
import '../chat';
```

Final touch, let's open our Rails view for the Channel show page

```erb
<div id="chat_app"></div>

<% content_for :after_js do %>
  <%= javascript_pack_tag "chat" %>
<% end %>
```

Make sure you have this in your `app/views/layouts/application.html.erb` to get the `content_for` above to work!

```erb
<%= yield :after_js %>
```

And that should be it! Go to [localhost:3000/channels/general](http://localhost:3000/channels/general) and open the Chrome console. Do you get some React errors? Good you're on track!

### Some words about the `cross-origin` error

In the Chrome console, you might now get this kind of errors:

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/rails-redux-cross-origin.png)

Well, usually it means that the Rails back-end threw a **500**. Head to the **Network** tab in the Chrome console and check for this AJAX request being red:

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/rails-redux-cross-origin-500.png)

You won't fix this error with your JavaScript code! Head over to the terminal logs to check out details about the Ruby error:

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/rails-redux-cross-origin-500-console.png)

Fix the Ruby error, and reload the page! Also, in the chrome inspector, **scroll up** to the the real error message before the "cross-origin" notice. No need for the `rack-cors` gem as the React app **lives inside the same domain as the Rails app**. That's the beauty of the Webpacker gem! Both backend + frontend code **live in the same repository**.

### Adapting the existing app

⚠️Before going further, open the `app/javascript/chat/containers/message_list.jsx` file and comment the line with `setInterval()`. We don't want to flood our back-end with faulty API request and the Chrome inspector with tons of errors.

There are some problems to fix on the current React+Redux app. Remember:

- The `selectedChannel` is not in the Redux State anymore
- The API has changed! We need to query our own Rails app now
- We don't have a `nickname` column in the `users` DB table. So we'll display the email instead (this should be handled in your `app/controllers/api/v1/messages_controller.rb`)

For the first problem, we need to remove the `selectedChannel` from all the `mapStateToProps()` functions and use the one **from the route**.

The thing is that the components who need this information are not directly linkedin to the Route, and the information get lost along the way. Look:

```jsx
// app/javascript/chat/index.jsx

// [...]
<Route path="/channels/:channel" component={App} />
```

We need the `App` to transmit information given from the router to its children:

```jsx
// app/javascript/chat/components/app.jsx

<ChannelList selectedChannel={props.match.params.channel} />
<MessageList selectedChannel={props.match.params.channel} />
```

This way, the two `<ChannelList />` and `<MessageList />` components will get the selected channel back in their props.

Regarding the other problem, your job is now to fix the Redux Action Creators! Open up the `app/javascript/chat/actions/index.js` and update the API URLs!

💡 Updating the URLs won't be enough. You will still get **401 - Not Authorized**. It's because of Devise! Remember, the API controllers are protected by Devise, which means that we need to make **authenticated** API calls. How do we do that? Simple, we **transmit the Devise** cookie. Using `fetch`, this is how you do it:

```js
fetch(url, { credentials: "same-origin" })
```

💡 Go to the next section only when the messages load correctly for the **#general** channel, not before.

### Feature: Changing channel

As we changed the router and the Redux state, make sure this feature still works and loads differnet messages.

### Feature: Posting a message

Again, we need to update the Redux Action to comply with the new Rails API. You will hit two problems:

- The POST body will not be exactly the same as before (we don't send the `author` anymore)
- You will hit a back-end **500** with `ActionController::InvalidAuthenticityToken`

To fix the latter, you need to update the `fetch` POST request with:

```js
const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

fetch(url, {
  // [...]
  headers: {
    // [...]
    'X-CSRF-Token': csrfToken
  },
  credentials: 'same-origin'
  // [...]
})
```

## Bonus

### Dynamic channel list

Have a look at your `initialState` in `app/javascript/chat/index.jsx`. The `channels` is **hard-coded**. We'd like to list **all the available channels** from the Rails Database. Basically, get this:

```ruby
Channel.all
```

How could the React app get his hand on the channel list? What's your first guess?

<details><summary>View solution</summary>
  
The first guess is to create an API endpoint to list the channels. We could then have an action calling this API and updating the Redux state. That's one way of doing it, but there is a simpler solution, considering that the channel list **won't vary in a browser session**:

First we need to **pass information from the Rails view to the React app**. We will use the [`data-` HTML attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes):

```erb
<div id="chat_app" data-channels=<%= Channel.all.to_json %>>
</div>
```

And then you can get this information back in React!

```js
const chatContainer = document.getElementById('chat_app'); // You should already have this line
const channels = JSON.parse(chatContainer.dataset.channels).map(c => c.name);

// Then use this `channels` in the initialState
```
</details>


### Adding a nickname

Create and run a migration to the `User` model to add a `nickname` field. Add this field in your seed and in the Devise sign-up process.

### Action Cable

We commented out the `setInterval` in the `<MessageList />` container. Well, the right approach when you use React in Rails + Webpacker is to use **Action Cable** and **push** new messages to all connected clients!
