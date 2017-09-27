# Redux garage 🚘

![](https://reacttraining.com/react-router/android-chrome-144x144.png)

It's now time to get familiar with [React Router](https://reacttraining.com/react-router/). Today, we'll build an application for garage (car repair shop ⚒) owners: a way to keep track of the cars entering their garage. Basically, a little CRUD app backed by a REST API.

## Getting started

### 1. Setup

Once again, we will start from the [Redux Router boilerplate](https://github.com/lewagon/redux-router-boilerplate).

```bash
cd ~/code/<github_username>

# Download boilerplate to new project `garage-redux`
git clone git@github.com:lewagon/redux-router-boilerplate.git garage-redux
cd garage-redux

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
