require("dotenv").config({ path: "../.env" });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

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
    port: 3006,
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

  // this plugin is to make sure we can use process.env in frontend code
  plugins: [
    new webpack.DefinePlugin({
      "process.env.OPENAI_API_KEY": JSON.stringify(process.env.OPENAI_API_KEY),
    }),

    new ModuleFederationPlugin({
      name: "natashaChatbotMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./NatashaChatbot": "./src/NatashaChatbot",
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
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Natasha Chatbot MFE - Standalone",
    }),
  ],
};
