define(['Mocha', 'Chai', 'UnitType'], 
function (mocha, chai, UnitType) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
        equal = assert.equal;

    suite('UnitType', function() {
        test('has expected members', function() {
            ok(UnitType.length, "length");
            equal(UnitType.length.value(), 0);
            ok(UnitType.mass, "mass");
            ok(UnitType.time, "time");
            ok(UnitType.current, "current");
            ok(UnitType.temperature, "temperature");
            ok(UnitType.luminousIntensity, "luminousIntensity");
        });
    });
});