No tests for this challenge, let's create an App!

### Giphy Search App

The goal of this challenge is to re-code from scratch (don't cheat!) the Giphy Search app from the lecture.

![Homer thinking](https://raw.githubusercontent.com/lewagon/react-redux-images/master/react/homer_thinking.png)

#### 1. Setup

For this challenge, we'll start from a [React boilerplate](https://github.com/lewagon/react-boilerplate):

```
cd ~/code/<github_username>

# Download boilerplate to new project `react-gifs` (or any other name)
git clone git@github.com:lewagon/react-boilerplate.git react-gifs
cd react-gifs
yarn install

# Destroy existing boilerplate git history, and start a new one
rm -rf .git
git init
git add .
git commit -m "Start new project from lewagon/react-boilerplate"

# Create a GitHub repo, and push!
hub create
git push origin master

# Time to open Sublime Text and code.
stt
```

Launch a `webpack-dev-server` and open a browser at `http://localhost:8080`!

#### 2. Features

1. When a user types a query, the list of Gifs should display the 10 first results the `giphy-api` returns.
1. When a user clicks on a gif from the list, it should appear on the main scene on the left.
1. (Optional) When a user focuses in / out of the input, find a nice way to twist the UI on the left part (opacity, background-color, border...) to show your user he's in / out of the input!

#### 3. Guidelines

- First, identify the components you need in your App.
- Then, think about the data and design their `props` / `state`
- Finally, add events / callbacks

#### 4. Style

We don't want you to waste too much time on CSS today, so try to pick up the rules you need from [this gist](https://gist.github.com/ssaunier/dbf2b76987ec62258d7ad51f0162a0ed)


### Solution

Don't cheat! Try to do as much as possible **by yourself** before looking at the solution repository.

<details><summary>View solution</summary><p>

👉 Here's [a live example](https://lewagon.github.io/react-giphy/) of the [solution repository](https://github.com/lewagon/react-giphy).

</p></details>
