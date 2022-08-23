const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack")

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  // ignoreWarnings: [
  //   {
  //     module: /node_modules[\\/]svelte-?/,
  //   },
  //   (warning, compilation) => true
  // ],
  target: 'web',
  entry: {
    bundle: ["./src/main.js"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
    publicPath: "http://localhost:8081/",
  },
  module: {
    rules: [
      // {
      //   test: /\.m?js/,
      //   type: "javascript/auto",
      // },
      // {
      //   test: /\.m?js/,
      //   resolve: {
      //     fullySpecified: false,
      //   }
      // },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    // historyApiFallback: { 
    //   index: 'index.html' // needed for direct navigation only
    // }
  },
  mode,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'LOAD_TYPE': JSON.stringify(process.env.LOAD_TYPE),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  devtool: prod ? false : "source-map",
};
