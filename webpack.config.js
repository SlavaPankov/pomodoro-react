const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = !IS_DEV;
const GLOBAL_SCSS_REGEXP = /\.global\.scss$/;

const filename = (ext) => (IS_DEV ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  mode: IS_DEV ? 'development' : 'production',
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename('.js')}`,
    assetModuleFilename: `assets/${filename('[ext]')}`,
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8081,
  },
  devtool: IS_PROD ? false : 'source-map',
  module: {
    rules: [
      {
        test: /.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/vars.scss'),
              ],
            },
          },
        ],
        exclude: GLOBAL_SCSS_REGEXP,
      },
      {
        test: GLOBAL_SCSS_REGEXP,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/vars.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(?:ico|png|jpeg|jpg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `fonts/${filename('[ext]')}`,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: ['ts', 'tsx', 'js', 'jsx'] }),
  ],
};
