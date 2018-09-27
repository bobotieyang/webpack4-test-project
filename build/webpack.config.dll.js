const webpack = require('webpack');
const resolve = require('./utils').resolve;

module.exports = {
  entry: {
    vendor: ['jquery' ,'lodash']
  },
  output: {
    path: resolve('./dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: resolve(''),
      path: resolve('./dll/','[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
