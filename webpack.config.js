const path              = require('path');
const DelWebpackPlugin  = require('del-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack           = require('webpack');

module.exports = [
  {
    mode: 'development',
    entry: {
      index: './src/js/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './public/js/')
    },
    externals: {
    },
    devServer: {
      contentBase: './public'
    },
    plugins: [
      new DelWebpackPlugin({
        include: [
          'public/'
        ]
      }),
      new HtmlWebpackPlugin({
        template: './src/index.template.ejs',
        inject: 'body',
        filename: 'index.html',
        chunks: ['index']
      }),
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   semantic: 'semantic-ui-css'
      // }),
      // new CopyWebpackPlugin([
      //   { from: 'src/config', to: '../config' },
      //   { from: 'src/main', to: '../main' }
      // ])
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      ]
    }
  }
];