const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  
  devServer: {
    port: 3004,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'userProfileMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './UserProfile': './src/UserProfile'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^17.0.2'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^17.0.2'
        }
      }
    }),
    
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'User Profile MFE - Standalone'
    })
  ]
}; 