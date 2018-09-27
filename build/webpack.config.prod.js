const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.base');
const resolve = require('./utils').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode, devMode, process.env.NODE_ENV);
// const devMode = false;

module.exports = merge(webpackConfig, {
  mode: 'production',
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    // 这里如果使用 [id].[chunkname].js
    // 会将下面splitChunks.cacheGroups.commons 和 vendors
    // 生成的文件也会变成数字+hash的格式
    // 因为都是chunk文件
    chunkFilename: '[name].[chunkhash].js'
  },
  devtool: false,
  optimization: {
    // 配合 mini-css-extract-plugin
    // 也会对css进行拆分
    splitChunks: {
      name: true,
      automaticNameDelimiter: '-',
      cacheGroups: {
        default: false,
        commons: {
          name: 'commons',
          chunks: 'initial',// 多入口初始代码
          minChunks: 2,
          minSize: 0 // 默认30k，这里设置成 0k
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime-app'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-test-project',
      filename: 'index.html',
      template: resolve('./src/index.html'),
      chunks: ['app' ,'commons' ,'vendors' ,'runtime-app']
    }),
    new HtmlWebpackPlugin({
      title: 'my-test-project',
      filename: 'other.html',
      template: resolve('./src/index.html'),
      chunks: ['other' ,'commons' ,'vendors']
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(''), // 设置root 否则会以 ./build 为root
      verbose: true,
      dry: false
    })
  ]
});
