define(['Mocha', 'Chai'], function(mocha, chai) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
        equal = assert.equal;

    suite('StandardSystems', function() {
        test('StandardSystems are ok', function() {
            var standardSystems = require('model/systems/StandardSystems');
            ok(standardSystems);
        });

        test('SI system: unit of energy is joule', function() {
            var standardSystems = require('model/systems/StandardSystems');

            var SI = standardSystems.systems().filter(function(s) {
                return s.name() === 'SI';
            })[0];

            ok(SI);
            ok(SI.ENERGY);
            equal(SI.ENERGY().name(), "joule");
        });
    });
});