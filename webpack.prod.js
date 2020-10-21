// webpack是node写出来的， 需要node的写法
const path = require("path"); // path.resolve 相对路径转成绝对路径

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const BundleAnalyzerWebpackPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const prodConfig = {
  /*
    要想使tree shaking生效，生成的代码必须是ES6模块。
    不能使用其它类型的模块如CommonJS之流。
    如果使用Babel的话，这里有一个小问题，因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型。
    修正这个问题也很简单，在.babelrc文件或在webpack.config.js文件中设置modules： false即可
  */
  mode: "production", // production模式下webpack会自动压缩代码和进行tree shaking
  devtool: "cheap-module-source-map", // 生产环境使用cheap-module-source-map
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 生产环境需要单独提取css文件
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css",
    }),
    new ManifestWebpackPlugin(), // 在某些情况，index.html模板由后端渲染，那么我们就需要一份打包清单，知道打包后的文件对应的真正路径
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
            collapse_vars: true, // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将var x = 1; y = x;转换成y = 1
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
