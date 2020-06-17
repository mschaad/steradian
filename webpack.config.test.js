/* jshint node: true */
var primaryConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');

var testConfigOverrides = {
    mode: 'development',
    resolve: {
        modules: [ "test" ],
        alias: {
            "strontium": "Strontium",
            "test/StandardStrontiumFn": "StandardStrontiumFn",
            "test/StandardUnitDefinitions": "StandardUnitDefinitions",
            "Mocha": "shims/mocha",
            "Chai": "shims/chai"
        }
    },
    target: 'web',
    externals: [ nodeExternals() ]
};

var mergedConfig = merge(
    primaryConfig, testConfigOverrides
);

module.exports = {
    default: mergedConfig,
    overrides: testConfigOverrides
};