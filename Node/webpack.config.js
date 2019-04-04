// webpack v4
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: {
    index: './src/index.js',
    /* login: './src/login/login.js',
    TakeCommand: './src/takeCommand/TakeCommand.js',
    postIncident: './src/postIncident/postIncident.js',
    forgot: './src/forgot/forgot.js',
    myDept: './src/myDept/myDept.js',
    signup: './src/signup/signup.js',
    questionnaire: './src/questionnaire/questionnaire.js',
    profile: './src/profile/profile.js',
*/
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
    ],
    splitChunks: {
      name: 'common',
      chunks: 'initial',
      minSize: 0,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      },
      /* {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }, */
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        query: {
          name: 'media/[hash]-[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      c3: 'c3',
      d3: 'd3',
    }),
    new CleanWebpackPlugin('dist', {}),
    // Create the stylesheet under 'styles' directory
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      // inject: 'body',
      hash: true,
      cache: true,
      // chunks: ['common', 'TakeCommand'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      favicon: './src/images/favicon.ico',
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
};
