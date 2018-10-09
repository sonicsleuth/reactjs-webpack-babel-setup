/* Webpack version 4 configuration */
var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist"); 
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    mode: 'development', /* options: "development", "production", "none" */
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, /* transpile both .js and .jsx files */
                include: SRC_DIR,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["react", "es2015", "stage-2"]
                    }
                }
            }
        ]
    }
};
module.exports = config;
