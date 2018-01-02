var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './public/routes.js',
    output: {
        path: path.resolve(__dirname, './public/build'),
        publicPath: '/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: './build/[name].[ext]?[hash]'
                }
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
} else {
    module.exports.devtool = '#source-map'
}
