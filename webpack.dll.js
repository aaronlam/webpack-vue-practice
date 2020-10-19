const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    vendors: ["vue"], // 手动指定打包哪些库
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].[hash:8].dll.js",
    library: "[name]", // 这里要喝dllplugin配置中的name保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./dll/[name].manifest.json"), // 生成对应的manifest.sjon，给webpack打包用
      name: "[name]",
    }),
  ],
};
