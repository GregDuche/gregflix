const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require("copy-webpack-plugin");

// App directory`
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader', options: {minimize: true}},
          {loader: 'less-loader'},


        ],
        exclude: /node_modules/
      }
    ]
  },

  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: {
    main: [
      './src/index.js',
      './src/style.less'
    ]
  },

  output: {

    // Development filename output
    filename: 'static/js/bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "img", to: "./img" },
      ],
    }),
  ],
  devServer: {

    // Serve index.html as the base
    contentBase: resolveAppPath('public'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 3000,

    // Public path is root of content base
    publicPath: '/',

  },
}
