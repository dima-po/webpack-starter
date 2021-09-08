const path = require('path')
const fs = require('fs')
const glob = require('glob')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets'
}

// Pages const for HtmlWebpackPlugin
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/views/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    modules: glob.sync(`${PATHS.src}/views/modules/**/*.js`), // Entry point to concat all .js files from views/modules folder
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[fullhash:5].min.js',
    publicPath: ''
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        // this applies to <template lang="pug"> in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // this applies to pug imports inside JavaScript
        {
          use: {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]},
  resolve: {
    alias: {
      '~': PATHS.src,
      "%blocks%": `${PATHS.src}/views/modules`
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new SVGSpritemapPlugin(
      `${PATHS.src}/${PATHS.assets}/img/svg/*.svg`,
      {
        output: {
          filename: `/img/sprites.svg`,
          svg: {
            sizes: false
          }
        },
        sprite: {
          generate: {
            title: false,
            use: true,
            symbol: true
          }
        },
        styles: {
          filename: `${PATHS.src}/styles/base/_sprites.scss`,
          variables: {
            sprites: 'sprite',
            sizes: 'size'
          }
        }
      }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash:5].min.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}/img`, to: 'img' },
        { from: `${PATHS.src}/${PATHS.assets}/fonts`, to: 'fonts' },
        { from: `${PATHS.src}/static`, to: '' },
      ]
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      inject: 'body'
    }))
  ],
}
