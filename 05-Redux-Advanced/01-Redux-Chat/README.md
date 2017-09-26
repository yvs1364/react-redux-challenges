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
