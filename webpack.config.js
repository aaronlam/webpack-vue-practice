var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"], // 项目入口，webpack会从该入口开始，把所有依赖的资源都加载打包
  devtool: "#cheap-module-eval-source-map", // map调试文件的生成模式，生产一般使用cheap-module-source-map模式，而开发一般使用cheap-module-eval-source-map。cheap不生成列信息（一般引擎会提供）提升map文件生成效率，module为了支持babel的预构建loader，eval则为了提升持续构建的效率（但会损失应用一定的运行性能）
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
