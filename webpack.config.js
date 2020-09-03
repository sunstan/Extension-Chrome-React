const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: path.resolve(__dirname, 'src/main.tsx'),
        background: path.resolve(__dirname, 'src/tools/background.ts'),
        initialization: path.resolve(__dirname, 'src/tools/initialization.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: [
                    'ts-loader',
                ],
            },
            {
                test: /\.scss$/,
                sideEffects: true,
                exclude: [/node_modules/],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    'babel-loader',
                ],
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets/app',
                    to: 'assets/app',
                },
                {
                    from: 'src/assets/icons',
                    to: 'assets/icons',
                },
                {
                    from: 'src/assets/images',
                    to: 'assets/images',
                },
                {
                    from: 'src/*.json',
                    to: '[name].json',
                },
            ]
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['main'],
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
        }),
    ],

};
