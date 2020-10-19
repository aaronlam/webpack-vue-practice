// webpack是node写出来的， 需要node的写法
const path = require("path"); // path.resolve 相对路径转成绝对路径

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const BundleAnalyzerWebpackPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const prodConfig = {
  mode: "production", // production模式下webpack会自动压缩代码
  devtool: "cheap-module-source-map", // 生产环境使用cheap-module-source-map
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader?indentedSyntax",
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      // 复制静态资源到打包输出文件夹
      {
        from: path.resolve(__dirname, "./public"),
        to: path.resolve(__dirname, "./dist"),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css",
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js"), // 把dll.js加进index.html里，并且拷贝文件到dist目录
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json"), // 读取dll打包后的manifest.json，分析需要跳过哪些库代码
    }),
    new ManifestWebpackPlugin(), // 在某些情况，index.html模板由后端渲染，那么我们就需要一份打包清单，知道打包后的文件对应的真正路径
    new CleanWebpackPlugin(), // 生成前先清除dist目录
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // 把动态和非动态模块同时进行优化打包，所有模块都放进bundle里面
    },
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: ".cache/",
        uglifyJS: {
          output: {
            comments: false, // 是否保留代码中的注释
            beautify: false, // 是否输出可读性较强的代码
          },
          compress: {
            drop_console: true, // 是否删除代码中的console语句
            collapse_vars: true, // 是否内嵌虽然已经定义了，但是只用到一次的变量
            reduce_vars: true, // 是否提取出现了多次，但是没有定义成变量去引用的静态值
          },
        },
      }),
    ],
  },
};

// 判断环境变量，是否开启分析报告
if (process.env.npm_config_report) {
  prodConfig.plugins.push(new BundleAnalyzerWebpackPlugin());
}

module.exports = merge(baseConfig, prodConfig);
