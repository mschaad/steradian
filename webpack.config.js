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
        alias: {
            Guard: "util/Guard",
            Strings: "util/Strings",
            Enum: "util/Enum",

            BaseUnit: "model/BaseUnit",
            DerivedUnit: "model/DerivedUnit",
            Dimensions: "model/Dimensions",
            Quantity: "model/Quantity",
            Term: "model/Term",
            Unit: "model/Unit",
            UnitExpression: "model/UnitExpression",
            Units: "model/Units",
            UnitType: "model/UnitType",
        }
    },
    module: {
        rules: [
        ]
    }
};