const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/routes.js',
  output: {
    path: path.resolve(__dirname, './client/build'),
    publicPath: '/',
    filename: 'build.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: './build/[name].[ext]?[hash]',
        },
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ];
} else {
  module.exports.devtool = '#source-map';
}
