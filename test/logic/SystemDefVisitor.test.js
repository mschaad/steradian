define(['Mocha', 'Chai', 'logic/SystemDefVisitor'], function(mocha, chai, SystemDefVisitor) {
    var suite = mocha.suite,
        test = mocha.test,
        assert = chai.assert,
        deepEqual = assert.deepEqual;

    suite('SystemDefVisitor', function() {
        test('no overrides required', function() {
            var siDef = getSIDefinition();
            var visitor = new SystemDefVisitor();
            visitor.visit(siDef, {});
        });

        test('visits each thing in turn', function() {
            var siDef = getSIDefinition();
            var visitor = new SystemDefVisitor();
            var copy = {};
            visitor.visit(siDef, {
                name: function(name) { 
                    copy.name = name; 
                },
                baseUnits: function(/*unitMap*/) { 
                    copy.base = {};
                },
                baseUnit: function(unitType, baseUnit) {
                    copy.base[unitType] = baseUnit;
                },
                derivedUnits: function(/*derivedUnitMap*/) {
                    copy.derived = {};
                },
                derivedUnit: function(unitType, derivedUnit) {
                    
                    copy.derived[unitType] = derivedUnit;
                },
                otherUnits: function(/*units*/) {
                    copy.other = [];
                },
                otherUnit: function(unit) {
                    copy.other.push(unit);
                }
            });

            deepEqual(siDef, copy);
        });

        test('skips missing derived units', function() {
            var siDef = getSIDefinition();
            siDef.derived.ENERGY = null;
            var visitor = new SystemDefVisitor();
            visitor.visit(siDef, {
                derivedUnit:
                 function(unitType, derivedUnit) {
                    if (!derivedUnit) {
                        throw new Error('did not skip missing Derived Unit of type ' + unitType);
                    }
                },
            });
        });
    });
    
    function getSIDefinition() {
        return {
            name: "SI",
            base: {
                length: {
                    name: 'meter',
                    type: 'length',
                    symbol: 'm',
                    scale: 1.0
                },
                mass: {
                    name: 'kilogram',
                    type: 'mass',
                    symbol: 'kg',
                    scale: 1.0
                },
                time: {
                    name: 'second',
                    type: 'time',
                    symbol: 's',
                    scale: 1.0
                },
                current: {
                    name: 'ampere',
                    type: 'current',
                    symbol: 'A',
                    scale: 1.0
                },
                temperature: {
                    name: 'degree celsius',
                    type: 'temperature',
                    symbol: '°C',
                    scale: 1.0
                },
                absoluteTemperature: {
                    name: 'degree kelvin',
                    type: 'absoluteTemperature',
                    symbol: '°K',
                    scale: 1.0
                },
                //'amount'
                luminousIntensity: {
                    name: 'candela',
                    type: 'luminousIntensity',
                    symbol: 'cd',
                    scale: 1.0
                }
            },
            derived: {
                ENERGY: {
                    name: 'joule',
                    units: [
                        { unit: 'newton', power: 1 },
                        { unit: 'meter', power: 1 }
                    ],
                    symbol: "J",
                    scale: 1.0,
                },
                //charge: coulomb
                FORCE: {
                    name: 'newton',
                    units: [
                        { unit: 'kilogram', power: 1 },
                        { unit: 'meter', power: 1 },
                        { unit: 'second', power: -2 }
                    ],
                    symbol: "N",
                    scale: 1.0,
                }
            },
            other: [
                {
                    name: 'kilometer',
                    symbol: 'km',
                    units: [
                        { unit: 'meter', power: 1 }
                    ],
                    scale: 1/1000
                }
            ]
        };
    }
});