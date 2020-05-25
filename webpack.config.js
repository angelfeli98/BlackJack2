const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssStractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin'); 

 
module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [
                          ["@babel/plugin-proposal-class-properties"],
                          ["@babel/plugin-transform-async-to-generator"],
                          ["@babel/plugin-transform-runtime"]
                        ]
                    }
                  }
            },
            {
               test:/\.css$/,
               exclude: /style\.css$/,
               use: [
                   'style-loader',
                   'css-loader'
               ]
            },
            {
                test:/style\.css$/,
                use: [
                     MiniCssStractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
            },
            {
                test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssStractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets/'},
        ])
    ]
 
    
}
 