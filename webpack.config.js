const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {config} = require('./package.json');

module.exports = (env, options) => {

    const isDev = options.mode === "development";

    let HtmlWebpackPlugins = [];

    config.pages.forEach(page => {
        for(file in page) {
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    filename: page[file],
                    template: config.src.base + file,
                    title: `This is ${page[file]}`
                })
            )
        }
    });

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
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        `css-loader?sourceMap=${ isDev }&url=false`,
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: isDev
                            }
                        },
                        `sass-loader?sourceMap=${ isDev }`
                    ]
                },
                {test: /\.ejs$/, loader: "ejs-loader"},
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            !isDev ? new CleanWebpackPlugin('dist') : () => {},
            new CopyWebpackPlugin([
                {
                    from: config.src.base + config.src.fonts,
                    to: config.build.fonts,
                },
                {
                    from: config.src.base + config.src.img,
                    to: config.build.img,
                }
            ]),
            new MiniCssExtractPlugin({
                filename: config.build.styles
            })
        ].concat(HtmlWebpackPlugins)
    }
};
