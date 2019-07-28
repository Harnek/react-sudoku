const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './dist',
    // watchContentBase: true,
    hot: true,
    historyApiFallback: true, // will redirect 404s to /index.html
  },
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],// , 'eslint-loader'],
      },
      {
        test: /\.ttf$/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: './',
              name: "./fonts/[name].[ext]",
              limit: 8192,
            },
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
