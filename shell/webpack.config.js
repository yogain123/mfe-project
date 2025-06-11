const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const isProduction = process.env.NODE_ENV === 'production';

// Environment-based URLs for MFEs
const getRemoteUrl = (port, name) => {
  if (isProduction) {
    // In production, these would be your S3 URLs or CDN URLs
    return `https://your-s3-bucket.s3.amazonaws.com/${name}/remoteEntry.js`;
  }
  return `http://localhost:${port}/remoteEntry.js`;
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  
  devServer: {
    port: 3000,
    historyApiFallback: true,
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
      name: 'shell',
      remotes: {
        // Component MFEs (can be embedded anywhere)
        headerMfe: `headerMfe@${getRemoteUrl(3001, 'header-mfe')}`,
        
        // Page MFEs (full page applications)
        productsMfe: `productsMfe@${getRemoteUrl(3002, 'products-mfe')}`,
        ordersMfe: `ordersMfe@${getRemoteUrl(3003, 'orders-mfe')}`
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^17.0.2',
          eager: true
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^17.0.2',
          eager: true
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.3.0',
          eager: false
        }
      }
    }),
    
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'MFE Shell - Learning Project'
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}; 