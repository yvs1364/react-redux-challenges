### My Second App

This morning we'll code another React application with the same approach as yesterday before diving into **Redux** this afternoon!

![Flats](https://raw.githubusercontent.com/lewagon/react-redux-images/master/react/flats.png)

#### 1. Setup

Like yesterday, we'll start from [our React boilerplate](https://github.com/lewagon/react-boilerplate):

```bash
cd ~/code/<github_username>

# Download boilerplate to new project `react-flats`
git clone git@github.com:lewagon/react-boilerplate.git react-flats
cd react-flats

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

1. When a user clicks on a flat from the list, the map should display a red dot on the flat's location.

#### 3. Guidelines

- First, identify the components you need in your App.
- Then, think static and design their `props`
- Then, add interactivity by subscribing to events, and coding the corresponding callbacks

#### 4. Detailed guidelines

One possible way to model your components in this App is the following:

![Components](https://raw.githubusercontent.com/lewagon/react-redux-images/master/react/components.png)

In order to fake a database of flats, you can create a `data` folder in your app with a `flats.js` file containing:

```js
const flats = [
  {
    name: "Charm at the Steps of the Sacre Coeur/Montmartre",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat1.jpg",
    price: 164,
    priceCurrency: "EUR",
    lat: 48.884211,
    lng: 2.34689
  },
  {
    name: "Trendy Apt in Buttes Montmartre",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat2.jpg",
    price: 200,
    priceCurrency: "EUR",
    lat: 48.885707,
    lng: 2.343543
  },
  {
    name: "Super 60m2 in trendy neighborhood!",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat3.jpg",
    price: 150,
    priceCurrency: "EUR",
    lat: 48.885312,
    lng: 2.341225
  },
  {
    name: "Splendide terrasse vue imprenable",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat4.jpg",
    price: 115,
    priceCurrency: "EUR",
    lat: 48.88184,
    lng: 2.343371
  },
  {
    name: "Superbe vue à 2 min du Sacré Coeur",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat5.jpg",
    price: 135,
    priceCurrency: "EUR",
    lat: 48.888839,
    lng: 2.339208
  },
  {
    name: "Bohemian and Chic in Paris",
    imageUrl: "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat6.jpg",
    price: 90,
    priceCurrency: "EUR",
    lat: 48.827855,
    lng: 2.350774
  }
];

export default flats;
```

You can then import it in the right component!

This will also give you hints on the props you need to model your flat component ;)

#### 5. Map

To display a map you can look into [this package](https://github.com/istarkov/google-map-react) which is quite handy when you wand to add your own components and display them on the map (for instance you can code your own `Marker` component to display the selected flat on the map).

#### 6. UI component

For our Flat component, we used the following markup:
```html
<div class="card" style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat3.jpg';);">
  <div class="card-category">150 EUR</div>
  <div class="card-description">
    <h2>Super 60m2 in trendy neighborhood!</h2>
  </div>
  <a class="card-link" href="#"></a>
</div>
```

and the following css:

```scss
// application.scss

@import "cards";

body {
  background-color: white;
}

#root {
  padding: 0;
  margin: 0;
  width: 100%;
}

#root > div {
  margin-top: 20px;
  display: flex;
}

.map-container {
  height: 100vh;
  width: 40%;
  position: sticky !important; /* !important to override Gmaps inline CSS */
  top: 0 !important;
}

.flat-list {
  padding-left: 10px;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .card {
    width: calc(50% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.marker {
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
}
```

```scss
// _cards.scss
.card {
  height: 230px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  background-size: cover !important;
  background-position: center;
  color: white;
  position: relative;
  &.active {
    border: 10px solid red;
  }
}
.card-user {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  border-radius: 50%;
}
.card-category {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 15px;
  text-transform: uppercase;
}
.card-description {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.card-description h2 {
  font-size: 20px;
}
.card-description p {
  font-size: 14px;
  opacity: 0.7;
  font-weight: lighter;
}
.card-link {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  background: black;
  opacity: 0;
}
.card-link:hover {
  opacity: 0.1;
}
```
