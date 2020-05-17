define(['Mocha', 'Chai', 
    'System', 'UnitType', 'DerivedUnitType',
    'StandardStrontiumFn'], 
function(mocha, chai, 
    System, UnitType, DerivedUnitType,
    StandardStrontiumFn) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal,
        throws = assert.throws,
        closeTo = assert.closeTo;

    var suite = mocha.suite, test = mocha.test;

    var Sr = StandardStrontiumFn();

    var meter = Sr.unit('meter'),
        kilogram = Sr.unit('kilogram'),
        second = Sr.unit('second'),
        ampere = Sr.unit('ampere'),
        degreeCelsius = Sr.unit('degreeCelsius'),
        degreeKelvin = Sr.unit('degreeKelvin'),
        candela = Sr.unit('candela'),
        newton = Sr.unit('Newton');

    var joule = Sr.unit('joule');

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
                ENERGY: joule,
                FORCE: newton
            }
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

        UnitType.values().forEach(function(type) { 
            test('has unit for Base type' + type.name(), function() {
                ok(SI[type.name()]());
            });
        });
        
        DerivedUnitType.values().forEach(function(type) { 
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
                'meter',
                'second'
            ];

            deepEqual(unitNames, expected);
        });
    });
});