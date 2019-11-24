define(['mocha', 'chai', 'Guard', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], function(mocha, chai, Guard, Unit, DerivedUnit, StandardStrontiumFn) {
	var assert = chai.assert;
	
	var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	var suite = mocha.suite, test = mocha.test;

    suite('isValue', function() {
        var Sr = StandardStrontiumFn();
        
        test('happy path', function() {
            assert.throws(function() {
                Guard(null, 'bogus').isValue();
            });
        });

        test('BaseUnit is value', function() {
            Guard(Sr.unit('meter'), 'unit').isValue();
        });
    });

    suite('instanceOf', function() {
        var Sr = StandardStrontiumFn();

        test('string is not Unit', function() {
            assert.throws(function() {
                Guard("bogus", 'unit').instanceOf(Unit);
            });
        });

        test('DerivedUnit is Unit', function() {
            Guard(Sr.unit('Newton'), 'unit').instanceOf(Unit);
        });

        test('BaseUnit is Unit', function() {
            Guard(Sr.unit('meter'), 'unit').instanceOf(Unit);
        });
    });
})