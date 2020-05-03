define(['Mocha', 'Chai', 'System', 'UnitType', 'StandardStrontiumFn'], 
function(mocha, chai, System, UnitType, StandardStrontiumFn) {
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
        candela = Sr.unit('candela');

    var joule = Sr.unit('joule');

    suite('System constructor', function() {
        test('happy path', function() {
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
                    energy: joule
                }
            });

            ok(SI);

            equal(SI.name(), "SI");

            //basic sanity check
            equal(SI.length().name(), "meter");

            //assert has all base unit types
            for(var type in UnitType) {
                ok(SI[type]().name());
            }
        });
    });
});