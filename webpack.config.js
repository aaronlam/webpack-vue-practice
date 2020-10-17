var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"], // 项目入口，webpack会从该入口开始，把所有依赖的资源都加载打包
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目打包后的文件路径
    publicPath: "/dist/", // 通过devServer访问的路径
    filename: "build.js", // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/, // 忽略node_modules文件夹下的文件，不用转码
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: ["vue-style-loader", "css-loader", "sass-loader"],
          },
        },
      },
    ],
  },
};
