define(['Mocha', 'Chai', 'Test', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], 
function(mocha, chai, Test, Unit, DerivedUnit, StandardStrontiumFn) {
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

    function suiteFor(name, fn, testCases) {
        suite(name, function() {
            var NAME = 0;
            var INPUT = 1;
            var EXPECTED_OUTPUT = 2;

            for(var i = 0; i < testCases.length; i++) {
                var testCase = testCases[i];
                var name = testCase[NAME];
                var input = testCase[INPUT];
                var expected = testCase[EXPECTED_OUTPUT];
                
                test(name, function() {
                    var actual = fn(input);
                    assert.equal(actual, expected);
                });
            }
        });    
    }

    function testCase(/*arguments*/) {
        var name, input, expectedOutput;
        if (arguments.length === 3) {
            name = arguments[0];
            input = arguments[1];
            expectedOutput = arguments[2];
        }
        else if (arguments.length === 2) {
            input = arguments[0];
            expectedOutput = arguments[1];
            name = testName(input);
        } else {
            throw new Error('invalid number of arguments: ' + arguments.length);
        }
        return [name, input, expectedOutput];
    }

    function zip(lhs, rhs) {
        return lhs.map(function(value, index) {
            return [ value, rhs[index] ];
        });
    }

    function isValueTestCase(expectedOutputs) {
        return zip(inputValues, expectedOutputs).map(function(args) {
            return testCase.apply(null, args);
        });
    }

    suiteFor('isUndefined', Test.isUndefined, isValueTestCase([true,  false, false, false, false]));
    suiteFor('isNull',      Test.isNull,      isValueTestCase([false, true,  false, false, false]));
    suiteFor('isValue',     Test.isValue,     isValueTestCase([false, false, true,  true,  true ]));

    suiteFor('isObject',    Test.isObject, [
        testCase(undefined, false),
        testCase(null, false),
        testCase("object literal",  {},                     true),
        testCase("string",          "a string",             false),
        testCase("String obj",      new String("a string"), true),
    ]);
});
