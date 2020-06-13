const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const isDev = process.env.MODE == 'development'

const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDev) {
    config.minimize = true
    config.minimizer = [
      new OptimizeCssWebpackPlugin(),
      new TerserPlugin()
    ]
  }

  return config
}

module.exports = {
  mode: process.env.MODE,
  entry: path.resolve('src/js/index.js'),
  output: {
    filename: 'js/bundle.[hash].js',
    path: path.resolve('dist')
  },
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      '~': path.resolve('node_modules')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src/favicon.ico'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/icons'),
          to: path.resolve('dist/icons')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ]
  },
  optimization: optimize(),
  devServer: {
    port: 9000,
    hot: true,
    clientLogLevel: 'none'
  }
}