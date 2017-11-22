let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');

module.exports = {
    entry: './app/Main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js',
        libraryTarget: 'amd',
        library: 'Rokk3rlabsPrueba'
    },

    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        // "jquery": "jQuery",
        // "underscore": "_",
        // "q": "Q"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3', 'react']
                }
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader?browsers=last 100 version!sass-loader?imagePath=~stylesheets/blocks&includePaths[]=./')
            },
            {
                test: /\.(png|jpg|svg|gif|eot|ttf|woff)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },

    postcss: [ autoprefixer({ browsers: ['last 100 versions'] }) ],

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: 'underscore',
            Q: 'q'
        }),

        new ExtractTextPlugin("[name].css", {
            allChunks: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })//,

        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],

    stats: {
        colors: true
    },
    //devtool: 'source-map',
    devtool: 'cheap-module-source-map',
    watch: true
};