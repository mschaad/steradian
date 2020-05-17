define(['Mocha', 'Chai','Units'], 
function (mocha, chai, Units) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

    suite('Units', function() {
        var meter = Units.createBaseUnit({
            name: 'meter',
            type: 'length',
            symbol: 'm',
            scale: 1
        });
        var second = Units.createBaseUnit({
            name: 'second',
            type: 'time',
            symbol: 's',
            scale: 1
        });
        var kilogram = Units.createBaseUnit({
            name: 'kilogram',
            type: 'mass',
            symbol: 'k',
            scale: 1
        });
        var newton = Units.createDerivedUnit({
            name: 'meter',
            units: [
                { unit: kilogram, power: 1  },
                { unit: meter,    power: 1  },
                { unit: second,   power: -2 },
            ],
            symbol: 'm',
            scale: 1
        });
        suite('isBaseUnit', function() {
            test('meter is base unit', function() {
                equal(Units.isBaseUnit(meter), true);
            });
            test('newton is not base unit', function() {
                equal(Units.isBaseUnit(newton), false);
            });
        });
        suite('isDerivedUnit', function() {
            test('newton is derived unit', function() {
                equal(Units.isDerivedUnit(newton), true);
            });
            test('meter is not derived unit', function() {
                equal(Units.isDerivedUnit(meter), false);
            });
        });
    });
});