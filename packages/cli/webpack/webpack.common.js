const webpack = require('webpack')
const { resolvePathWithCmd } = require('../helpers/resolvePath')
const { getStyleLoaders } = require('../helpers/getStyleLoaders')

module.exports = {
  entry: {
    index: resolvePathWithCmd('src/index.tsx')
  },

  output: {
    path: resolvePathWithCmd('dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: 'chunk-[name].[chunkhash:6].js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.html'],
    alias: {
      '@': resolvePathWithCmd('src')
    }
  },

  module: {
    rules: [
      ...getStyleLoaders(['css', 'scss', 'sass', 'less']),
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              compilerOptions: { noEmit: false }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // 对所有 chunk 提供 react 包，写 tsx 时无需导入 React
    new webpack.ProvidePlugin({
      React: ['react']
    })
  ]
}
