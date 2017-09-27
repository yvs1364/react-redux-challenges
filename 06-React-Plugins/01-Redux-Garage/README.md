# Redux garage 🚘

[![](https://reacttraining.com/react-router/android-chrome-144x144.png)](https://reacttraining.com/react-router/)

It's now time to get familiar with [React Router](https://reacttraining.com/react-router/). Today, we'll build an application for garage (car repair shop ⚒) owners: a way to keep track of the cars entering their garage. Basically, a little CRUD app backed by a REST API.

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-garage-index.png)

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

### 2. Redux state

What will be the Redux state tree? What information do we need to hold?

Think about it, and check with our own solution:

<details><summary>View solution</summary><p>

Here's our proposal:

```js
const garageName = prompt("What is your garage?") || `garage${Math.floor(10 + (Math.random() * 90))}`;
const initialState = {
  garage: garageName,
  cars: []
};

const reducers = combineReducers({
  garage: (state = null, action) => state,
  cars: carsReducer
});

// [...]
const store = createStore(reducers, initialState, middlewares);

// TODO: use this store in your `<Provider />`!
```

</p></details>

## Home page

This will be our first `<Route>` in the `<Switch>`. You can name the component linked to this route `<CardsIndex>`.

Before actually calling an API, you can use the following _fake_ data in the Redux initial state for `cars`:

```js
[
  { id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
  { id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
  { id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
  { id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' }
]
```
