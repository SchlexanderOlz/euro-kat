const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      exclude: /genStyle/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource',
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    // Svelte loader just as an example
    {
      test: /\.svelte$/,
      exclude: /node_modules/,
      use: {
        loader: 'svelte-loader',
      }
    }
    // Add more rules for other file types as needed
  ],
 },
};
