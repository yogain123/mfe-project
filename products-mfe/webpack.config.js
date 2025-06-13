const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const isProduction = process.env.NODE_ENV === "production";

// Environment-based URLs for MFEs
const getRemoteUrl = (port, name) => {
  if (isProduction) {
    // Pull from S3 bucket for production
    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${name}/remoteEntry.js`;
    console.log("s3Url", s3Url);

    const cloudFrontUrl = `https://${process.env.CLOUD_FRONT_URL}/${name}/remoteEntry.js`;
    console.log("cloudFrontUrl", cloudFrontUrl);

    return cloudFrontUrl;
  }

  return `http://localhost:${port}/remoteEntry.js`;
};

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
    port: 3002,
    historyApiFallback: true,
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
      name: "productsMfe",
      filename: "remoteEntry.js",
      exposes: {
        // Expose the main App component for the Shell to consume
        "./App": "./src/App",
      },
      remotes: {
        // This MFE can also consume other MFEs (like User Profile)
        userProfileMfe: `userProfileMfe@${getRemoteUrl(
          3004,
          "mfe/user-profile-mfe"
        )}`,
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
          eager: false,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Products MFE - Standalone",
    }),
  ],
};
