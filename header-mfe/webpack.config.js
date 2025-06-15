const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const isProduction = process.env.NODE_ENV === "production";

/**
 * You can have multiple entry points and multiple exposed modules, but they're all served from a single `remoteEntry.js` unless you split builds using separate Webpack configs.
 *
 * Entry points are used to run your app in standalone mode.
 * Exposes define what modules are available to host apps via Module Federation.
 * Each exposed module gets its own chunk and is included in `remoteEntry.js`, even if it's not part of any entry point.
 *
 * Entry points and exposes are independent of each other.
 *
 * Go to Order mfe to explore below examples which will prove my point above
 * - multiple entry points
 * - completely different exposed modules which are not part of the main entry point
 */

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",

  output: {
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: isProduction
      ? "[name].[contenthash].chunk.js"
      : "[name].chunk.js",
    clean: true,
  },

  devServer: {
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "headerMfe",
      filename: "remoteEntry.js",
      exposes: {
        // This is the key part - we're exposing our Header component
        "./Header": "./src/Header",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^17.0.2",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^17.0.2",
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.3.0",
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Header MFE - Standalone",
    }),
  ],
};
