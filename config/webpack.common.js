const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: {
    app: [helpers.root('client/app/index.js')],
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css', '.scss', '.html'],
    alias: {
      app: path.resolve(__dirname, '../client/app'),
      assets: path.resolve(__dirname, '../client/public/assets'),
      enums: path.resolve(__dirname, '../client/app/enums'),
      validation: path.resolve(__dirname, '../client/app/validation'),
      shared: path.resolve(__dirname, '../shared/'),
    },
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.(jsx|js)?$/,
        include: helpers.root('client'),
        loaders: 'babel-loader',
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.svg?$/,
        issuer: {
          test: /\.(jsx|js|ts|tsx)?$/,
        },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg?$/,
        issuer: {
          test: /\.scss$/,
        },
        loader: 'url-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.(gif|png|jpe?g)$/i,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         bypassOnDebug: true
      //       }
      //     }
      //   ]
      // },
      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('client/public/index.html'),
      inject: 'body',
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd,
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root('client/public'),
      },
    ]),
  ],
};
