const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const devConfig = {
  mode: "development", // development模式下webpack不会压缩代码
  devtool: "cheap-module-eval-source-map", // 开发环境使用cheap-module-eval-source-map提高持续构建效率
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "vue-style-loader",
            options: {
              hmr: true,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "vue-style-loader",
            options: {
              hmr: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: "vue-style-loader",
            options: {
              hmr: true,
            },
          },
          "css-loader",
          "sass-loader?indentedSyntax",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

module.exports = merge(baseConfig, devConfig);
