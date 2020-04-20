const config = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');


config.mode = 'development';
config.resolve.modules.push("test");
config.resolve.alias["test/StandardStrontiumFn"] = "StandardStrontiumFn";
config.resolve.alias["test/StandardUnitDefinitions"] = "StandardUnitDefinitions";
config.resolve.alias["Mocha"] = "shims/mocha";
config.resolve.alias["Chai"] = "shims/chai";

config.target = 'web';
config.externals = [ nodeExternals() ];

module.exports = config;