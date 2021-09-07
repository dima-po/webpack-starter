const webpack =  require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

// DEV config
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: 'minimal',
  devServer: {
    static: {
      directory: baseWebpackConfig.externals.paths.dist
    },
    port: 4000,
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    }
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/,
      use: [
        // 'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath: '../' }
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
