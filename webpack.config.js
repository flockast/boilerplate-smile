const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssInlineSvg = require('postcss-inline-svg');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {smile} = require('./package.json');

module.exports = (env, options) => {

    const isDev = options.mode === 'development';

    let HtmlWebpackPlugins = [];
    let copyFiles = [];

    if(smile.routes) {
        smile.routes.forEach(route => {
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: `${smile.src.base}/${smile.src.views}/${route.file}`,
                    filename: `${route.url}/index.html`.split('/').filter(el => el !== '').join('/'),
                    chunks: route.chunks
                })
            )
        })
    }


    if(smile.copy) {
        smile.copy.forEach(copy => {
            copyFiles.push({
                from: `${smile.src.base}/${copy.from}`,
                to: copy.to
            })
        })
    }

    return {
        entry: [
            `${smile.src.base}/${smile.src.js}`,
            `${smile.src.base}/${smile.src.styles}`
        ],
        output: {
            path: path.resolve(__dirname, smile.build.base),
            filename: smile.build.js,
            publicPath: smile.publicPath
        },
        devServer: {
            overlay: true
        },
        devtool: isDev ? 'source-map' : '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(njk|nunjucks|nunj)$/,
                    use: ['html-loader', {
                        loader: 'nunjucks-html-loader',
                        options : {
                            searchPaths: [`${smile.src.base}/${smile.src.views}`]
                        }
                    }]
                },
                {
                    test: /\.(png|jpg|gif|ttf|woff|woff2|eot|otf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "[path][name].[ext]",
                                context: smile.src.base
                            },
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        `css-loader?sourceMap=${isDev}`,
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    postCssInlineSvg(),
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: isDev
                            }
                        },
                        `group-css-media-queries-loader?sourceMap=${isDev}`,
                        `sass-loader?sourceMap=${isDev}`
                    ]
                },
                {test: /\.vue$/, loader: 'vue-loader',},
                {test: /\.ejs$/, loader: 'ejs-loader'},
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
            extensions: ['.js', '.vue']
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            !isDev ? new CleanWebpackPlugin('dist') : () => {},
            new CopyWebpackPlugin(copyFiles),
            new MiniCssExtractPlugin({
                filename: smile.build.styles
            }),
            ...HtmlWebpackPlugins
        ]
    }
};
