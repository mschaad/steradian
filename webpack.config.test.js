const path = require("path");
const config = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');

function resolvePath(dir) {
    return path.resolve(__dirname, dir);
}

config.resolve.modules.push("test");
//config.entry = resolvePath("test/**/*.test.js");
config.resolve.alias.test = "../test";
config.output = {
    path: resolvePath('dist'),
    filename: 'Strontium.tests.js'
},
config.target = 'node';
config.externals = [ nodeExternals() ];

module.exports = config;