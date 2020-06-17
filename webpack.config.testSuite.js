/* jshint node: true */

var strontiumDir = './';

var webpackTestConfigModule = require(strontiumDir + 'webpack.config.test.js');

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
        filename: 'StrontiumTestSuite.js',
        library: 'StrontiumTestSuite',
        libraryTarget: 'commonjs',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    entry: "Strontium.test.js",
    resolve: {
        modules: [
            strontiumDir + "test",
            strontiumDir + "src/model/systems",
            "node_modules"
        ],
        alias: aliases
    },
    externals: [
        nodeExternals(),
        {
            strontium: {
                commonjs: 'strontium',
                commonjs2: 'strontium',
                amd: 'strontium',
                root: 'strontium'
            }
        }
    ]
};

module.exports = config;