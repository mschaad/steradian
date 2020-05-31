define(
    ['Mocha', 'Chai', 'Test',
    'model/systems/StandardSystems', 'UnitRegistry', 'Unit',
    'Convert'], 
    function(mocha, chai, Test,
        StandardSystems, UnitRegistry, Unit,
        Convert) {

    var suite = mocha.suite,
    test = mocha.test;

    var assert = chai.assert;
    var equal = assert.equal;

    function installUnits(system, reg) {
        system.allUnits()
            .forEach(function(unit) {
                reg.register(unit);
            });
    }

    suite('unitsToSystem', function() {
        var reg = new UnitRegistry();
        StandardSystems.systems()
            .forEach(function(system) {
                reg.registerSystem(system);
            });

        var SI = reg.getSystem('SI');
        var Imperial = reg.getSystem('Imperial');

        installUnits(SI, reg);
        installUnits(Imperial, reg);

        test('base unit', function() {
            var converted = Convert.unitsToSystem(
                SI.length().expression(), Imperial, reg
            );

            equal(Imperial.length().toString(), converted.toString());
        });

        test('derived unit', function() {
            var converted = Convert.unitsToSystem(
                SI.FORCE(), Imperial, reg
            );

            var Units = require('Units');
            equal(Units.isDerivedUnit(SI.FORCE()), true);

            equal(Imperial.FORCE().toString(), converted.toString());
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
                    ENERGY: null,
                    //charge: coulomb
                    FORCE: SI.FORCE()
                },
                other: [

                ]
            });

            var converted = Convert.unitsToSystem(
                SI.ENERGY(), brokenSI, reg
            );

            equal("N m", converted.toString());
        });
    });
});