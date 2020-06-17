define(['Mocha', 'Chai', 
    'System', 'UnitType', 'DerivedUnitType',
    'StandardSteradianFn'], 
function(mocha, chai, 
    System, UnitType, DerivedUnitType,
    StandardSteradianFn) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;

    var suite = mocha.suite, test = mocha.test;

    var Sr = StandardSteradianFn();

    var meter = Sr.unit('meter'),
        kilogram = Sr.unit('kilogram'),
        second = Sr.unit('second'),
        ampere = Sr.unit('ampere'),
        degreeCelsius = Sr.unit('degreeCelsius'),
        degreeKelvin = Sr.unit('degreeKelvin'),
        candela = Sr.unit('candela'),
        newton = Sr.unit('Newton');

    var joule = Sr.unit('joule');
    var kilometer = Sr.derivedUnit({
        name: 'kilometer',
        units: [
            { unit: 'meter', power: 1 },
        ],
        symbol: 'km',
        scale: 1000
    });

    function constructSI() {
        var SI = System.create({
            name: "SI",
            base: {
                length: meter,
                mass: kilogram,
                time: second,
                current: ampere,
                temperature: degreeCelsius,
                absoluteTemperature: degreeKelvin,
                //'amount'
                luminousIntensity: candela
            },
            derived: {
                energy: joule,
                force: newton
            },
            other: [
                kilometer
            ]
        });
        return SI;
    }

    suite('System constructor', function() {
        var SI = constructSI();

        test('returns on object', function() {
            ok(SI);
        });

        test('has name()', function() {
            equal(SI.name(), "SI");
        });

        test('has LENGTH', function() {
            ok(SI.length);

            //basic sanity check
            equal(SI.length().name(), "meter");
        });

        test('has kilometer (other unit)', function() {
            var kilometer = SI.other[0];
            equal(kilometer.toString(), "km");
        });

        UnitType.values().forEach(function(type) { 
            test('has unit for Base type ' + type.name(), function() {
                ok(SI[type.name()]());
            });
        });

        var derivedUnitsTypes = [DerivedUnitType.energy, DerivedUnitType.force];
        
        derivedUnitsTypes.forEach(function(type) { 
            test('has unit for Derived type ' + type.name(), function() {
                ok(SI[type.name()]());    
            });
        });
    });

    suite('allUnits() static method', function() {
        var SI = constructSI();

        test('returns all registered units', function() {
            var unitNames = SI.allUnits()
                .map(function(unit) { return unit.name(); });

            unitNames.sort();

            var expected = [
                'Newton',
                'ampere',
                'candela',
                'degreeCelsius',
                'degreeKelvin',
                'joule',
                'kilogram',
                'kilometer',
                'meter',
                'second'
            ];

            deepEqual(unitNames, expected);
        });

        test('skips DerivedUnits that are not defined', function() {
            var someSystem = System.create({
                name: "someSystem",
                base: {
                    length: meter,
                    mass: kilogram,
                    time: second,
                    current: ampere,
                    temperature: degreeCelsius,
                    absoluteTemperature: degreeKelvin,
                    //'amount'
                    luminousIntensity: candela
                },
                derived: {
                    energy: null,
                    force: newton
                }
            });

            var unitNames = someSystem.allUnits()
                .map(function(unit) { return unit.name(); });

            unitNames.sort();

            var expected = [
                'Newton',
                'ampere',
                'candela',
                'degreeCelsius',
                'degreeKelvin',
                'kilogram',
                'meter',
                'second'
            ];

            deepEqual(unitNames, expected);
        });
    });
});