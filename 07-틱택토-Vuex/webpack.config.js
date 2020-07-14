// vue-loader 플러그인
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

// module.exports 는 export default 와 같다.
module.exports = {
  mode: "development", // 개발 상태, 배포면 production
  devtool: "eval", // 개발 중일 때. webpack 처리가 빨라진다. 배포중일 땐 hidden-source-map을 주로 쓴다
  resolve: {
    // import 할때 .js와 .vue는 생략이 가능
    extensions: [".js", ".vue"]
  },
  entry: {
    app: path.join(__dirname, "./index.js")
  },
  // 웹팩의 핵심
  module: {
    // 어떻게 js 파일들을 합칠 건지?
    rules: [
      {
        // 파일명이 .vue로 끝나는 파일들은 vue-loader를 사용한다
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        // .css 파일은 vue-style-loader가 처리한다
        test: /\.css$/,
        loader: ["vue-style-loader", "css-loader"]
      }
    ]
  },
  // vue-loader 플러그인
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist"
  }
};
