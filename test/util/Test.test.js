define(['Mocha', 'Chai', 'Test', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], function(mocha, chai, Test, Unit, DerivedUnit, StandardStrontiumFn) {
	var assert = chai.assert;
	
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
    var suite = mocha.suite, test = mocha.test;
    
    function testName(input) {
        if (input === null) {
            return "null";
        } else if (typeof input === 'undefined') {
            return 'undefined';
        } else {
            return input.toString();
        }
    }

    var inputValues = [undefined, null, {}, "string", Unit];

    function suiteFor(name, fn, inputValues, expectedValues) {
        suite(name, function() {
            for(var i = 0; i < inputValues.length; i++) {
                var input = inputValues[i];
                var expected = expectedValues[i];
                
                test(testName(input), function() {
                    var actual = fn(input);
                    assert.equal(actual, expected);
                });
            }
        });    
    }

    suiteFor('isUndefined', Test.isUndefined, inputValues, [true, false, false, false, false]);
    suiteFor('isNull', Test.isNull, inputValues, [false, true, false, false, false]);
    suiteFor('isValue', Test.isValue, inputValues, [false, false, true, true, true]);
});
