define(['Mocha', 'Chai'], function(mocha, chai) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;

    suite('StandardSystems', function() {
        test('StandardSystems are ok', function() {
            var standardSystems = require('model/systems/StandardSystems');
        });
    });
});