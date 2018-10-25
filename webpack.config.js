const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    const isDev = env.mode === "development";

    return {
        entry: [
            './src/js/index.js',
            './src/styles/index.scss'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader'],
                        publicPath: '../'
                    })
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                context: './src/img',
                                name: '[name].[ext]',
                                outputPath: 'img/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                context: './src/fonts',
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.ejs',
                minify: {
                    collapseWhitespace: !isDev
                }
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].bundle.css',
            })
        ]
    }
};