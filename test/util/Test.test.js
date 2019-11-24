define(['mocha', 'chai', 'Test', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], function(mocha, chai, Test, Unit, DerivedUnit, StandardStrontiumFn) {
	var assert = chai.assert;
	
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	var suite = mocha.suite, test = mocha.test;

    suite('isValue', function() {
        test('undefined', function() {
            var foo;
            assert.notOk(Test.isValue(foo));
        });

        test('null', function() {
            assert.notOk(Test.isValue(null));
        });

        test('object', function() {
            assert.ok(Test.isValue({}));
        });

        test('string', function() {
            assert.ok(Test.isValue("string"));
        });

        test('Unit', function() {
            assert.ok(Test.isValue(Unit));
        });
    });
});
