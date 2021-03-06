const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/main.js"],
  }, // 项目入口，webpack会从该入口开始，把所有依赖的资源都加载打包（value为数组时webpack把从左至右的优先级按次序打包文件代码）
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目打包后的文件路径
    filename: "[name].[hash:8].js", // 打包后的文件名
    chunkFilename: "[name].[hash:8].js", // chunk打包后的文件名
    // publicPath: 'https://cdn.example.com/' // 如果静态文件放在了cdn，css图片路径自动添加前缀
  },
  module: {
    //noParse: '/jquery|loadash/', // 不去解析这些没有依赖的库
    rules: [
      {
        test: /\.vue$/,
        //loader: "vue-loader",
        use: ["cache-loader", "vue-loader"], // cache-loader做了和babel-loader?cacheDireactory=true开启cache之后做的事情一样（将loader的编译结果写入硬盘缓存。再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存）
      },
      // {
      //   test: /\.js$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/, // 忽略node_modules文件夹下的文件，不用转码
      // },
      {
        test: /\.js$/,
        use: ["happypack/loader?id=happyBabel"], // 把js文件处理交给id为happyBabel的happypack的实例执行
        // 也可以使用下面这种对象形式加载happypack
        // {
        //   loader: 'happypack/loader',
        //   options: {
        //     id: "happyBabel",
        //   },
        // },
        include: path.resolve(__dirname, "./src"), // 只对src目录中的文件采用该loader配置
        exclude: path.resolve(__dirname, "./node_modules"), // 排除node_modules目录下的文件采用该loader配置
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash:8]",
          limit: 8192, // 文件大小小于该值（单位byte）时，会返回一个dataurl
        },
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
    new HtmlWebpackPlugin({
      template: "./src/index.html", // html模板位置
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js"), // 把dll.js加进index.html里，并且拷贝文件到dist目录
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json"), // 读取dll打包后的manifest.json，分析需要跳过哪些库代码
    }),
    new VueLoaderPlugin(), // 它的职责是将你定义过的其它规则复制并应用到vue文件里相应语言的
    new HappyPack({
      id: "happyBabel", // 与loader对应的id标识
      // 用法和loader配置一样，这里是loaders
      loaders: ["babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool, // 共享进程池
      verbose: true, // 输出日志
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
  ],
  resolve: {
    // 这里会影响到dllplugin的效果，会造成dll打一次，prod也打一次vue的包，造成重复打包
    // alias: {
    //   vue$: "vue/dist/vue.esm.js",
    // },
    modules: [path.resolve(__dirname, "node_modules")], // 用于配置webpack去哪些目录下寻找第三方模块，默认是['node_modules']，但是他会先于当前目录的./node_modules去查找，发现不存在，再递归向上查找
    extensions: [".jsx", ".js"], // 在导入没有带文件后缀时，webpack会自动带上后缀去尝试文件是否存在，而这里用于用于配置所尝试的后缀列表
  },
  externals: {
    //jquery: "jQuery", // 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置Externals
  },
};
