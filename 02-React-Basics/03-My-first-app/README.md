No tests for this challenge, let's create an App!

### My First App

The goal of this challenge is to code the Gifs app taken as an example during the lecture, and finish it!

![Homer thinking](https://raw.githubusercontent.com/lewagon/react-redux-images/master/react/homer_thinking.gif)

#### 1. Setup

For this challenge, we'll start from a [React boilerplate](https://github.com/lewagon/react-boilerplate):

```
cd ~/code/<github_username>

# Download boilerplate to new project `react-gifs` (or any other name)
git clone git@github.com:lewagon/react-boilerplate.git react-gifs
cd react-gifs

# Destroy existing boilerplate git history, and start a new one
rm -rf .git
git init
git add .
git commit -m "initial commit with boilerplate"

# Create a GitHub repo, and push!
hub create
git push origin master

# Install the dependencies listed in the `package.json` file with:
yarn install

# Time to open Sublime Text and code.
stt
```

Launch a `webpack-dev-server` and open a browser at `http://localhost:8080`!

#### 2. Features

1. When a user types a query, the list of Gifs should display the 10 first results the `giphy-api` returns.
1. When a user clicks on a gif from the list, it should appear on the main scene on the left.
1. (Optional) When a user focuses in / out of the input, the frame holding the selected gif should turn blue / white.

#### 3. Guidelines

- First, identify the components you need in your App.
- Then, think static and design their `props`
- Then, add interactivity by subscribing to events, and coding the corresponding callbacks

Good luck!
