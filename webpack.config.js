const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const smile = require('./smile.config.js');

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
        stats: 'minimal',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(njk|nunjucks|nunj)$/,
                    use: [
                        'html-loader',
                        {
                            loader: 'nunjucks-html-loader',
                            options : {
                                searchPaths: [`${smile.src.base}/${smile.src.views}`]
                            }
                        }
                    ]
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
                        `postcss-loader?sourceMap=${isDev}`,
                        `sass-loader?sourceMap=${isDev}`
                    ]
                },
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            !isDev ? new PurgeCssPlugin({
                paths: glob.sync(`${smile.src.base}/${smile.src.views}/**/*`, { nodir: true })
            }) : () => {},
            new CopyWebpackPlugin(copyFiles),
            new MiniCssExtractPlugin({
                filename: smile.build.styles
            }),
            ...HtmlWebpackPlugins
        ]
    }
};
