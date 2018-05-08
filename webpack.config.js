const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
