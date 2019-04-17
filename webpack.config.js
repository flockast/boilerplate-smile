const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssInlineSvg = require('postcss-inline-svg');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {config} = require('./package.json');

module.exports = (env, options) => {

    const isDev = options.mode === "development";

    let HtmlWebpackPlugins = [];
    let copyFiles = [];

    if(config.pages) {
        config.pages.forEach(page => {
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: config.src.base + config.src.templates + page.from,
                    filename: page.to,
                    data: page.data || {}
                })
            )
        })
    }

    if(config.copy) {
        config.copy.forEach(copy => {
            copyFiles.push({
                from: config.src.base + copy.from,
                to: copy.to
            })
        })
    }

    return {
        entry: [
            config.src.base + config.src.js,
            config.src.base + config.src.styles
        ],
        output: {
            path: path.resolve(__dirname, config.build.base),
            filename: config.build.js,
            publicPath: config.publicPath
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
                            searchPaths: [`${config.src.base}${config.src.templates}`]
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
                                context: config.src.base
                            },
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        `css-loader?sourceMap=${ isDev }`,
                        {
                            loader: "postcss-loader",
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
                        `group-css-media-queries-loader?sourceMap=${ isDev }`,
                        `sass-loader?sourceMap=${ isDev }`
                    ]
                },
                {test: /\.ejs$/, loader: "ejs-loader"},
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            !isDev ? new CleanWebpackPlugin('dist') : () => {},
            new CopyWebpackPlugin(copyFiles),
            new MiniCssExtractPlugin({
                filename: config.build.styles
            }),
            ...HtmlWebpackPlugins
        ]
    }
};
