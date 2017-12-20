const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/01_article_with_state.jsx"),
  output: {
    filename: "dist/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: "sourcemap"
};
