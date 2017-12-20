## Wagon Cities

This afternoon, we'll code a new React application listing all Wagon cities. We'll be able to click on a city in the list and get details about this city in the right panel. Here is a screenshot of the application we want to build, with the different components and containers.

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/redux/wagon_cities.png)

### 1. Setup

This time, we will start from the [Redux boilerplate](https://github.com/lewagon/redux-boilerplate).

```bash
cd ~/code/<github_username>

# Download boilerplate to new project `wagon-cities`
git clone git@github.com:lewagon/redux-boilerplate.git wagon-cities
cd wagon-cities

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

### 2. Assets

Here is some CSS you can add to `assets/stylesheets/application.scss`:

```scss
body {
  color: white;
  background-color: black;
}

.app {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  .cities {
    width: 30%;
  }
  .active-city {
    width: 70%;
    margin-left: 20px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    h3 {
      margin-top: 0;
    }
  }
}

.list-group-item {
  background-color: transparent;
  cursor: pointer;
}
```

---

Let's try to do some React, **without** Redux first.

### 3. CityList + City

Create two files in `src/containers`:

```bash
touch src/containers/city_list.jsx
touch src/containers/city.jsx
```

Your goal is to implement those two components so that the following `App` loads correctly:

```jsx
// src/components/app.jsx
// [...]

// TODO: remove this line and use Redux
const cities = [
  { name: 'Paris', address: '16 Villa Gaudelet, 75011 Paris', slug: 'paris' },
  { name: 'London', address: '14-22 Elder St, London E1 6BT', slug: 'london' },
  { name: 'Berlin', address: 'Rudi-Dutschke-Straße 26, 10969 Berlin', slug: 'berlin' },
];

const App = () => {
  return (
    <div className="app">
      <CityList cities={cities} />
    </div>
  );
};
```

### 4. Moving to Redux

Instead of loading the list of cities in `App`, we should have an redux **action** triggered in the `CityList#componentWillMount()` method.
Go ahead and add this action. Then, update the redux state tree in `src/index.jsx` with a new `cities` key. This key will be handled by a new reducer to be created in `src/reducers/cities_reducer.js`.

This action can use the following fake DB (we don't have API calls yet):

```js
[
  { name: "Paris", address: "16 Villa Gaudelet, 75011 Paris", slug: "paris" },
  { name: "London", address: "14-22 Elder St, London E1 6BT", slug: "london" },
  { name: "Berlin", address: "Rudi-Dutschke-Straße 26, 10969 Berlin", slug: "berlin" },
  { name: "Bali", address: "Jalan Raya Batu Bolong, Canggu, Badung Regency, Bali, Indonesia", slug: "bali" },
  { name: "Budapest", address: "Budapest, Hungary", slug: "budapest" },
  { name: "Montréal", address: "5333, avenue Casgrain, 102, Montréal (Québec), H2T1X3", slug: "montreal" },
  { name: "Tokyo", address: "2-11-3 Meguro, Meguro-ku, Tokyo ", slug: "tokyo" },
  { name: "Amsterdam", address: "Overhoeksplein 2, 1031 KS Amsterdam", slug: "amsterdam" },
  { name: "Shanghai", address: "129 West Yan\"an Road, JingAn District, Shanghai", slug: "shanghai" },
  { name: "Brussels", address: "Place Sainte-Gudule 5, 1000 Brussels", slug: "brussels" },
  { name: "Lisbon", address: "Avenida Casal Ribeiro 28, Lisbon", slug: "lisbon" },
  { name: "Florianópolis", address: "Rod. José Carlos Daux, 4150 - Saco Grande, Florianópolis - SC, 88032-005", slug: "florianopolis" },
  { name: "Chengdu", address: "399 Fucheng Avenue West Section, Chengdu, Sichuan, China", slug: "chengdu" },
  { name: "Milan", address: "Milan, Metropolitan City of Milan, Italy", slug: "milan" },
  { name: "Rio de Janeiro", address: "Rua Duque Estrada, 41 - Gávea, Rio de Janeiro", slug: "rio" },
  { name: "Belo Horizonte", address: "Av. Afonso Pena, 2881, Belo Horizonte", slug: "belo-horizonte" },
  { name: "São Paulo", address: "Rua Mourato Coelho, 1404 – Vila Madalena, São Paulo - SP", slug: "sao-paulo" },
  { name: "Barcelona", address: "Travessera de Dalt, 33, 08024 Barcelona", slug: "barcelona" },
  { name: "Copenhagen", address: "Ahornsgade 15, 2200 KBH N", slug: "copenhagen" },
  { name: "Nantes", address: "11 impasse Juton, Nantes", slug: "nantes" },
  { name: "Aix - Marseille", address: "Rue Joseph Biaggi, 13003 Marseille", slug: "aix-marseille" },
  { name: "Bordeaux", address: "107 cours Balguerie Stuttenberg, 33300", slug: "bordeaux" },
  { name: "Lille", address: "2 Avenue des Saules, 59000 Lille", slug: "lille" },
  { name: "Lyon", address: "23 Rue Paul Montrochet, 69002 Lyon", slug: "lyon" }
]
```

You can get the image of the flat using the slug and this API, replacing `:slug` with `paris`, `london`, etc.

```
https://kitt.lewagon.com/placeholder/cities/:slug
```

### 5. Active City

`<App />` just has one child, `<CityList />`. We want to add an new container, `<ActiveCity />` which will display information about the city which has just been clicked.

1. Add a new redux state key `activeCity` in the root reducer.
2. Add a new reducer for this new key
3. Implement a new action, `setActiveCity(city)`
4. Go back to the `<City />` container, `mapDispatchToProps()` the `setActiveCity` action and use it in a `onClick` callback.
5. Implement the `ActiveCity` using the new `activeCity` in the redux state tree.
