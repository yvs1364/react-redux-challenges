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

### 1. Rendering a fake list of cars

This will be our first `<Route>` in the `<Switch>`. You can name the component linked to this route `<CarsIndex>`.

Before actually calling an API, you can use the following _fake_ data in the Redux initial state for `cars`:

```js
[
  { id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
  { id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
  { id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
  { id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' }
]
```

### 2. Fetching cars from the API

You want to call the API and fetch all the cars for a **given garage**.

The API you need to call is [documented here](https://github.com/lewagon/garage-api#readme).

Here's a hint:

```js
fetch('https://wagon-garage-api.herokuapp.com/my-awesome-garage/cars');
```

This action should return an action with a payload that will be resolved by the `ReduxPromise` middleware!

## Form page

![](https://github.com/lewagon/react-redux-images/blob/master/redux/redux-garage-new.png)

This will be the second `<Route>` of our app, for the container `<CarsNew>` to be created.

#### Redux Form

1. With the help of this morning's slides, implement your form using the [Redux Form](https://github.com/erikras/redux-form) package. **Make sure you download version `7.2.0` by running `yarn add redux-form@7.2.0`**
1. Once the call to the API is done, the app should [navigate by itself](https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router) back to the home page, listing all cars.
1. Add a presence validation on each field (you can have a look [here](https://redux-form.com/6.6.2/examples/fieldlevelvalidation/) for guidance)
1. Add a format validation on the plate license (should be all caps and no special characters)
1. Add hints under each input when validations are not met
1. The button should remain disabled until all validations are met


## Show page

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/redux-garage-show.png)

This will be the thrid and last `<Route>` of our app, for the container `<CarsShow>` to be created. The goal is to display details about a given car (brand, model, owner and license plate).

From this page, you should implement a **Delete** button which will remove the car from the inventory. This button should **call the API** to remove the car from the Database API. After deletion, it should navigate back to the index page.

