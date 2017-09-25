No tests for this challenge, let's create an App!

### My First App

The goal of this challenge is to code the Gifs app taken as an example during the lecture, and finish it!

![Homer thinking](https://raw.githubusercontent.com/lewagon/react-redux-images/master/react/homer_thinking.png)

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

#### 4. Style

We don't you to waste too much time on CSS today, so try to pick up the rules you need from this cheatsheet:

```scss
$input-height: 34px;
$margin-top: 20px;

body {
  background-color: white;
}

.form-control {
  background-color: transparent;
  border-radius: 0;
  color: white;
}

.container {
  padding: 0;
  margin: 0;
  width: 100%;
}

.container > div {
  display: flex;
}

.main-scene {
  width: 60%;
  position: sticky;
  top: 20px;
  height: calc(100vh - #{$margin-top});

  .gif {
    max-width: 80%;
    max-height: 80%;
    margin: auto;
  }

  &:before {
    content: '\F002';
    position: absolute;
    top: 35px;
    left: 60px;
    font-family: FontAwesome;
    color: black;
    font-size: 2.6em;
    opacity: 0.4;
  }
}

.main-frame {
  display: flex;
  flex-direction: column;
  border: none;
  height: calc(100% - 120px);
  background-color: #ffffff;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.22'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

.form-control {
  background-color: white;
  border: none;
  padding: 60px 60px 80px 120px;
  font-size: 2.6em;
  color: black;
  box-shadow: none;
}

.form-control:focus {
  box-shadow: none;
}

.list-container {
  width: 40%;
  height: 100vh;
  padding-top: 15px;
  background-color: white;
  background: #ecf0f1;
  overflow: scroll;
}

.gif-list {
  column-count: 2;
  padding: 15px;

  .gif {
    width: 100%;
    margin-right: 10px;
    margin-bottom: 15px;
    cursor: pointer;
  }
}

.blue {
  border-color: #66afe9;
}

.white {
  border-color: #ccc;
}
```

Good luck!
