const path = require('path');
const { argv } = require('process');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: argv.mode === 'production' ? '/weather-app' : '/',
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
    ],
  },
};