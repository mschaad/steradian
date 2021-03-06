/* jshint node: true */
var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');

function resolvePath(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    mode: 'production',
    entry: resolvePath('src/Steradian.js'),
    output: {
        path: resolvePath('dist'),
        filename: 'Steradian.js',
        library: "Steradian",
        libraryTarget: "umd",
        // this option makes the umd build work in Node environments.
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    devtool: 'source-map',
    resolve: {
        modules: ["src", "node_modules"],
        alias: {
            Guard: "util/Guard",
            Strings: "util/Strings",
            Arrays: "util/Arrays",
            Test: "util/Test",
            Enum: "util/Enum",

            Convert: "logic/Convert",

            BaseUnit: "model/BaseUnit",
            DerivedUnit: "model/DerivedUnit",
            Dimensions: "model/Dimensions",
            Quantity: "model/Quantity",
            Term: "model/Term",
            Unit: "model/Unit",
            UnitExpression: "model/UnitExpression",
            Units: "model/Units",
            Terms: "model/Terms",
            UnitType: "model/UnitType",
            DerivedUnitType: "model/DerivedUnitType",
            UnitRegistry: "model/UnitRegistry",
            System: "model/System"
        }
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // include specific files based on a RegExp
            include: /dir/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ]
};