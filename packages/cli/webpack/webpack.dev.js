const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const { resolvePathWithCmd } = require('../helpers/resolvePath')
const common = require('./webpack.common')

/** @type {import('webpack').Configuration} **/
const configuration = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePathWithCmd('public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new EslintWebpackPlugin({
      cache: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: ['node_modules']
    })
  ]
}

module.exports = merge(common, configuration)
