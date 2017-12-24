const path = require('path');

function resolvePath(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    entry: resolvePath('src/Strontium.js'),
    output: {
        path: resolvePath('dist'),
        filename: 'Strontium.js'
    },
    resolve: {
        modules: ["src", "node_modules"],
        alias: {}
    },
    module: {
        rules: [
        ]
    }
};