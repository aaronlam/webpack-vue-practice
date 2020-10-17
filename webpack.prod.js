var path = require("path");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var ManifestWebpackPlugin = require("webpack-manifest-plugin");
var webpack = require("webpack");
var AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
var merge = require("webpack-merge");
var baseConfig = require("./webpack.base");
var BundleAnalyzerWebpackPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

var prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },
  plugins: [
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js"), // 把dll.js加进index.html里，并且拷贝文件到dist目录
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json"), // 读取dll打包后的manifest.json，分析需要跳过哪些库代码
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
    new ManifestWebpackPlugin(), // 在某些情况，index.html模板由后端渲染，那么我们就需要一份打包清单，知道打包后的文件对应的真正路径
  ],
};

// 判断环境变量，是否开启分析报告
if (process.env.npm_config_report) {
  prodConfig.plugins.push(new BundleAnalyzerWebpackPlugin());
}

module.exports = merge(baseConfig, prodConfig);
