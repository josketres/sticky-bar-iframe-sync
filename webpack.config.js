const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        outer: './src/outer.js',
        inner: './src/inner.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{from: '*.css', context: 'src/'}]),
        new HtmlWebpackPlugin({
            filename: 'outer.html',
            template: 'src/outer.html',
            chunks: ['outer']
        }),
        new HtmlWebpackPlugin({
            filename: 'inner.html',
            template: 'src/inner.html',
            chunks: ['inner']
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        openPage: 'outer.html',
        open: true
    }
};