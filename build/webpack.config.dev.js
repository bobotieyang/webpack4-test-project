const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.base');
const resolve = require('./utils').resolve;
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode, devMode, process.env.NODE_ENV);
// const devMode = false;

module.exports = merge(webpackConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // static 目录内的内容可以通过 localhost:8080/test.json 来访问
    contentBase: [
      // resolve('./dll'), // dll 目录， 用来访问 vendor.dll.js
      resolve('./static2'),
      resolve('./static')
    ],
    hot: true,
    open: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-test-project',
      filename: 'index.html',
      template: resolve('./src/index.html'),
      chunks: ['app'],
      // vendorDllPath: '/vendor.dll.js'
    }),
    new HtmlWebpackPlugin({
      title: 'my-test-project',
      filename: 'other.html',
      template: resolve('./src/index.html'),
      chunks: ['other'],
      // vendorDllPath: '/vendor.dll.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 用 autodll-webpack-plugin 替换 DllPlugin + DllReferencePlugin
    // 可以实现自动更新 dll 文件
    new AutoDllPlugin({
      filename: '[name].dll.js',
      inject: true, // 配合HtmlWebpackPlugin
      context: resolve(''), // 设置到项目根目录
      entry: {
        vendor: [
          'jquery',
          'lodash'
        ]
      }
    })
    // new webpack.DllReferencePlugin({
    //   context: resolve(''),
    //   manifest: require('../dll/vendor-manifest.json')
    // })
  ]
});
