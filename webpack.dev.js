var path = require("path");
var merge = require("webpack-merge");
var baseConfig = require("./webpack.base");

var devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    port: 9001,
    open: true,
    hot: true,
  },
};

module.exports = merge(baseConfig, devConfig);
