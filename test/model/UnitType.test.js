define(['Mocha', 'Chai', 'UnitType'], 
function (mocha, chai, UnitType) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;

    suite('UnitType', function() {
        test('has expected members', function() {
            equal(UnitType.length, 0);
            ok(UnitType.mass, "mass");
            ok(UnitType.time, "time");
            ok(UnitType.current, "current");
            ok(UnitType.temperature, "temperature");
            ok(UnitType.luminousIntensity, "luminousIntensity");
        });
    });
});