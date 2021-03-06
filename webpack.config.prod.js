const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const stylesheetsLoaders = [
    {
        loader: "css-loader",
        options: {
            modules: true,
            sourceMap: true
        }
    }
];

const stylesheetsPlugin = new ExtractTextPlugin("style.css");

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
});
const compressionPlugin = new CompressionPlugin();

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./index",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    devtool: "cheap-source-map",
    plugins: [stylesheetsPlugin, uglifyPlugin, compressionPlugin],
    resolve: {
        modules: ["node_modules", path.join(__dirname, "src")]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        ...stylesheetsLoaders,
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ]
    }
};
