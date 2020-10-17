var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/main.js", // 项目入口，webpack会从该入口开始，把所有依赖的资源都加载打包
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
    ],
  },
};
