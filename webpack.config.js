const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const { configureStore } = require('@reduxjs/toolkit');

/** @type {import('webpack').Configuration} */
module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx|jsx|js)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset'
            },
            {
                test: /\.s[ac]ss$/i,
                include: [
                    path.join(__dirname, 'node_modules/wix-animations'),
                    path.join(__dirname, 'node_modules/wix-style-react')
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: [/\.st\.css$/],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                        // options: {
                        // 	importLoaders: 1,
                        // 	modules: {
                        // 		localIdentName: '[name]__[local]___[hash:base64:5]',
                        // 		exportLocalsConvention: 'camelCase'
                        // 	}
                        // }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['@svgr/webpack', 'url-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
                logLevel: 'info',
                extensions: ['.ts', '.tsx', '.js'],
                mainFields: ['browser', 'main']
            })
        ],
        alias: {
            'lodash-es': 'lodash'
        },
        fallback: { "url": false }
    },
    plugins: [
        new StylableWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Layout Library',
            template: 'public/index.html'
        }),
        new LodashModuleReplacementPlugin({
            shorthands: true
        }),
        //new BundleAnalyzerPlugin(),
        //new DuplicatePackageCheckerPlugin(),
        new CompressionPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        allowedHosts: ['mina-corner.com', 'www.mina-corner.com']
    },
    output: {
        // path: path.resolve('./build'),
        // publicPath: 'http://localhost:9000/filemanager/',
        // filename: '[name].bundle.js'
        publicPath: '/'
    }
    // cache: { type: 'filesystem' }
};
