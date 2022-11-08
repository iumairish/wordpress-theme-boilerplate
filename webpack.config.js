const path                  = require('path');
const webpack               = require('webpack');
const autoprefixer          = require('autoprefixer');
const globImporter          = require('node-sass-glob-importer');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const ConcatPlugin          = require('webpack-concat-plugin');

const environment           = process.env.NODE_ENV !== 'development';

module.exports = function() {

    const mode = process.env.NODE_ENV || 'development';
    const extensionPrefix = mode === 'production' ? '.min' : '';

    const publicPath = path.resolve(__dirname, '');

    const paths = {
        css:    'css/',
        img:    'images/',
        font:   'fonts/',
        js:     'js/'
    };

    const loaders = {
        css: {
            loader: 'css-loader',
            options: {
                sourceMap: false,
            },
        },
        postCss: {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer( {
                        flexbox: 'no-2009',
                    } ),
                ],
                sourceMap: false,
            },
        },
        sass: {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    importer: globImporter()
                },
                sourceMap: false,
            },
        },
    };

    const entry = {
        app: [
            publicPath + '/build/app.js',
        ]
    };

    const config = {
        mode,
        entry,
        output: {
            path: path.resolve(publicPath, 'assets'),
            filename: `[name]${ extensionPrefix }.js`,
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js|.jsx/,
                    loader: 'import-glob',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.js|.jsx/,
                    use: 'babel-loader',
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../images/'
                            }
                        },
                        loaders.css,
                        loaders.postCss,
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        loaders.css,
                        loaders.sass,
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: paths.font
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpeg|jpg|gif|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: paths.img
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new MiniCssExtractPlugin( {
                path: paths.css,
                filename: `css/main${ extensionPrefix }.css`,
            } ),
            new webpack.DefinePlugin( {
                'process.env.NODE_ENV': JSON.stringify( mode ),
            } ),
            new ConcatPlugin({
                fileName: `main${ extensionPrefix }.js`,
                outputPath: paths.js,
                filesToConcat: [
                    publicPath + '/build/js/dependencies/*',
                    publicPath + '/build/js/main.js',
                ]
            })
        ],
    };

    if ( mode !== 'production' ) {
        config.devtool = 'source-map';
    }

    return config;

};
