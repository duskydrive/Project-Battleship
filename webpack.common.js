const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'Webpack App',
        filename: 'index.html',
        template: './src/template.html',
        inject: 'body',
      },
    ),
  ],
  module: {
    rules: [
      {
        // це для імпорту зображень з src to dist
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
