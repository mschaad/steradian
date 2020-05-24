var primaryConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');

var testConfigOverrides = {
    mode: 'development',
    resolve: {
        modules: [ "test" ],
        alias: {
            "test/StandardStrontiumFn": "StandardStrontiumFn",
            "test/StandardUnitDefinitions": "StandardUnitDefinitions",
            "Mocha": "shims/mocha",
            "Chai": "shims/chai"
        }
    },
    target: 'web',
    externals: [ nodeExternals() ]
};

module.exports = merge(
    primaryConfig, testConfigOverrides
);