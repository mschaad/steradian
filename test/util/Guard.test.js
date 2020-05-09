define(['Mocha', 'Chai', 'Guard', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], 
function(mocha, chai, Guard, Unit, DerivedUnit, StandardStrontiumFn) {
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

    suite('isObject', function() {
        test('string is not object', function() {
            assert.throws(function() {
                Guard('a bogus value', 'value').isObject();
            });
        });
        test('string is not object', function() {
            Guard({}, 'value').isObject();
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

    suite('isFunction', function() {
        test('object is not function', function() {
            assert.throws(function() {
                Guard({}, 'object').isFunction();
            });
        });

        test('function is function', function() {
            Guard(function() {}, 'fn').isFunction();
        });

        test('new Function is function', function() {
            Guard(new Function(), 'fn').isFunction();
        });
    })
})