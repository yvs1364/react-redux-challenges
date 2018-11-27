const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/01_article_with_state.jsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
