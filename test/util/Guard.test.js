define(['Mocha', 'Chai', 'Guard', 'Unit', 'Strings', 'test/StandardSteradianFn'], 
function(mocha, chai, Guard, Unit, Strings, StandardSteradianFn) {
	var assert = chai.assert;
	
    var suite = mocha.suite, test = mocha.test,
        throws = chai.assert.throws;

    suite('isValue', function() {
        var Sr = StandardSteradianFn();
        
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
        var Sr = StandardSteradianFn();

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
            /* jshint -W054 */
            Guard(new Function(), 'fn').isFunction();
            /* jshint +W054 */
        });
    });

    suite('isArray(test)', function() {
        var ofString = function(s) {
            if (!Strings.isString(s)) {
                return {
                    arrayElementDescription: "of strings",
                    elementErrorDescription: "is not a string"
                };
            }
        };
        test('happy path', function() {
            var input = ['foo','bar', 'baz'];
            
            Guard(input, 'input').isArray(ofString);
        });
        test('failure case', function() {
            var input = ['foo','bar',1];
            
            var expectedErrorMessage = "input should have been an array of strings, but found that element at index 2 ('1') is not a string";
            throws(function() {
                Guard(input, 'input').isArray(ofString);
            }, expectedErrorMessage);
            
        });
    });
});