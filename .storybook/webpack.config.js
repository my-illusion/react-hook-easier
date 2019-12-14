const path = require('path');
const { compilerOptions } = require('../tsconfig.json');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC_PATH = path.join(__dirname, '../src');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md?$/,
        loader: 'markdown-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [SRC_PATH],
        options: {
          transpileOnly: true, // use transpileOnly mode to speed-up compilation
          compilerOptions: {
            ...compilerOptions,
            declaration: false,
          },
        },
      },
      {
        test: /\.(tsx)$/,
        include: [SRC_PATH],
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            // 引入样式为 css
            // style为true 则默认引入less
            ['import', { libraryName: 'antd', style: 'css' }],
          ],
        },
      },
      {
        test: /\.(css)$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
