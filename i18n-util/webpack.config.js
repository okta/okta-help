const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'i18n-util.bundle.[fullhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Okta help',
      filename: 'okta_help.htm'
    }),
    new webpack.BannerPlugin(`
      ATTENTION:
      Do not manually edit this file. This file is autogerated. 
      Refer i18n-util/readme.md to see how this file is generated for production.
    `)
  ]
};
