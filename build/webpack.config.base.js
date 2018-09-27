const webpack = require('webpack');
const resolve = require('./utils').resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: './src/app.js',
    other: './src/other.js',
    // 和 splitChunks.cacheGroups.commons 重名
    // 所以会将 commons.js的代码也合并到其中
    // 不会产生入口文件
    // commons: './src/commons.js'
  },
  output: {
    path: resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // devMode
          //   ? 'style-loader'
          //   : MiniCssExtractPlugin.loader,
          'css-hot-loader', // 处理热更新
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css',
      // 如果这里设置成 [id].[chunkhash].css
      // 通过splitChunks进行拆分时
      // 生成的文件名会是  数字+chunkhash的格式
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css'
    }),
  ]
};
