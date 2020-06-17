/* jshint node: true */

var steradianDir = './';

var webpackTestConfigModule = require(steradianDir + 'webpack.config.test.js');

var nodeExternals = require('webpack-node-externals');

var aliases = Object.assign(
    {}, 
    webpackTestConfigModule.overrides.resolve.alias,
    {
        'model/systems/SI_def': "SI_def.js"
    }
);

var config = {
    mode: 'development',
    output: {
        filename: 'SteradianTestSuite.js',
        library: 'SteradianTestSuite',
        libraryTarget: 'commonjs',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    entry: "Steradian.test.js",
    resolve: {
        modules: [
            steradianDir + "test",
            steradianDir + "src/model/systems",
            "node_modules"
        ],
        alias: aliases
    },
    externals: [
        nodeExternals(),
        {
            steradian: {
                commonjs: 'steradian',
                commonjs2: 'steradian',
                amd: 'steradian',
                root: 'steradian'
            }
        }
    ]
};

module.exports = config;