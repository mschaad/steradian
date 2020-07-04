define(
    ['Mocha', 'Chai', 'Test',
    'model/systems/StandardSystems', 'UnitRegistry', 'Unit',
    'Quantity', 'Convert'], 
    function(mocha, chai, Test,
        StandardSystems, UnitRegistry, Unit,
        Quantity, Convert) {

    var suite = mocha.suite,
        test = mocha.test;

    var assert = chai.assert;
    var equal = assert.equal,
        closeTo = assert.closeTo;

    function installUnits(system, reg) {
        system.allUnits()
            .forEach(function(unit) {
                reg.register(unit);
            });
    }

    function testRegistry() {
        var reg = new UnitRegistry();
        StandardSystems.systems()
            .forEach(function(system) {
                reg.registerSystem(system);
            });

        var SI = reg.getSystem('SI');
        var Imperial = reg.getSystem('Imperial');

        installUnits(SI, reg);
        installUnits(Imperial, reg);
        return reg;
    }

    var reg = testRegistry(),
            SI = reg.getSystem('SI'),
            Imperial = reg.getSystem('Imperial');

    function quantity(unitLike, value) {
        var unitExp = Convert.toUnitExpression(unitLike, reg);
        return new Quantity(unitExp, value, reg);
    }

    suite('quantity', function() {
        test('quantity(q, <string:system>, registry)', function() {
            var feet = quantity('foot', 4);
            var meters = Convert.quantity(feet, 'SI', reg);
            closeTo(1.2191999, meters.value, 1e-7);
        });
    });

    suite('unitsToSystem', function() {
        test('base unit', function() {
            var converted = Convert.unitsToSystem(
                SI.length().expression(), Imperial, reg
            );

            equal(Imperial.length().toString(), converted.toString());
        });

        test('derived unit', function() {
            var converted = Convert.unitsToSystem(
                SI.force(), Imperial, reg
            );

            var Units = require('Units');
            equal(Units.isDerivedUnit(SI.force()), true);

            equal(Imperial.force().toString(), converted.toString());
        });

        test('conversion of unparalleled derived unit', function() {
            var reg = new UnitRegistry();
            
            reg.registerSystem(SI);

            var brokenSI = reg.registerSystem({
                name: "broken SI",
                base: {
                    length: SI.length(),
                    mass: SI.mass(),
                    time: SI.time(),
                    current: SI.current(),
                    temperature: SI.temperature(),
                    absoluteTemperature: SI.absoluteTemperature(),
                    //'amount'
                    luminousIntensity: SI.luminousIntensity()
                },
                derived: {
                    energy: null,
                    //charge: coulomb
                    force: SI.force()
                },
                other: [

                ]
            });

            var converted = Convert.unitsToSystem(
                SI.energy(), brokenSI, reg
            );

            equal("N m", converted.toString());
        });
    });
});