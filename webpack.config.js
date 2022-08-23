const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack")

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  ignoreWarnings: [
    {
      module: /node_modules[\\/]svelte-?/, // With Routify 3 I had to add this because svelte compiler warnings were taking over my render in devServer. See error-svelte-compiler.png in root folder.
    },
    (warning, compilation) => true
  ],
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
  },
  module: {
    rules: [
      // begin new rules for Routify 3 -
      // for Routify 3 I must add these rules due to scroll.js and strict modules error. See the error-strict-module-scroll.js.png in root folder.
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        }
      },
      // end of new rules for Routify 3
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
    historyApiFallback: { 
      // in Routify 3 routing doesn't work at all. I get a 404 served from Webpack (not a Routify 404). 
      // If I add this fallback option, it does work, although it does a full page reload for every navigation. 
      index: 'index.html' 
    }
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
  ],
  devtool: prod ? false : "source-map",
};
