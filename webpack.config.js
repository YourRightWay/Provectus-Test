var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

// test
module.exports = {
    devtool: 'eval-source-map',
    context: __dirname + '/public',
    entry: [
        __dirname + '/src/index.js',
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$|\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.png$/,
                use: {loader: 'url-loader', options: {limit: 100000}},
            },
            {
                test: /\.jpg$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf$/, loader: 'file-loader'
            },
            {
                test: /\.eot$/, loader: 'file-loader'
            },
            {
                test: /\.otf$/, loader: 'file-loader'
            },
            {
                test: /\.svg$/, loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            },
            __DEVELOPMENT__: true,
            __PRODUCTION__ : false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            'last 3 version',
                            'ie >= 10',
                        ],
                    }),
                ]
            },
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        contentBase: './public',
        port: 3000,
        inline: true,
        historyApiFallback: true,
        hot: true
    }
}