var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/main.js"],
  }, // 项目入口，webpack会从该入口开始，把所有依赖的资源都加载打包
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目打包后的文件路径
    filename: "[name].js", // 打包后的文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/, // 忽略node_modules文件夹下的文件，不用转码
      },
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new VueLoaderPlugin(), // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
};
