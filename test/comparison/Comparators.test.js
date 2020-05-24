define(['Mocha', 'Chai', 'comparison/Comparators', 'Arrays'], 
function (mocha, chai, Comparators, Arrays) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal,
        throws = assert.throws;

    
    // function spy(name, comparator) {
    //     /* globals console */
    //     var d = function(lhs, rhs) {
    //         var comp = comparator(lhs, rhs);
    //         console.log(name + ": " + lhs + " vs " + rhs + " = " + comp);
    //         return comp;
    //     };
    //     return d;
    // }

	suite("Comparators", function () {
        function sort(a, comparator) {
            if (!comparator) {
                throw new Error("oops! You forgot to supply a comparator!");
            }
            var clone = Arrays.clone(a);
            clone.sort(comparator);
            return clone;
        }

        function assertInputGivesExpectedOutput(comparator, input, expected) {
            var actual = sort(input, comparator);
            deepEqual(actual, expected);
        }

        suite("DEFAULT", function() {
            var c = Comparators.DEFAULT;

            test('strings', function() {
                var input = ["b", "a", "c"];
                var expected = ["a", "b", "c"];
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test('numbers', function() {
                var input = [ 2, 1, 3];
                var expected = [1, 2, 3];
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test('null sorts to top', function() {
                var input = [null, 2, null, 1, 3, null];
                var expected = [null, null, null, 1, 2, 3];
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test('undefined sorts to top', function() {
                // there is a special case for 'undefined' in Arrays.prototype.sort that 
                // makes it sort to the bottom, so we can't use that method directly
                // to test this behavior.
                equal(-1, c(undefined, 1));
                equal(1, c(1, undefined));
                equal(0, c(undefined, undefined));
                equal(0, c(undefined, null));
                equal(0, c(null, undefined));
            });
        });

        suite("STRING", function() {
            var c = Comparators.STRING;

            test('strings', function() {
                var input = ["b", "a", "c"];
                var expected = ["a", "b", "c"];
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test('throws on non string', function() {
                var input = ["b", "a", 1];
                throws(function() {
                    sort(input, c);
                });
            });
        });

        suite("byProjection", function() {
            test("property projection", function() {
                var input = [
                    { index: 2 },
                    { index: 3 },
                    { index: 1 }
                ];
                var expected = [
                    { index: 1 },
                    { index: 2 },
                    { index: 3 }
                ];

                var ofIndex = function(item) {
                    return item.index;
                };
                var c = Comparators.byProjection(ofIndex, Comparators.DEFAULT);
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test("with undefined property values", function() {
                var input = [
                    { value: undefined }, 
                    { value: 2 }, 
                    { value: undefined }, 
                    { value: 1 }, 
                    { value: 3 },
                    { value: undefined }
                ];
                var expected = [ 
                    { value: undefined }, 
                    { value: undefined }, 
                    { value: undefined }, 
                    { value: 1 }, 
                    { value: 2 }, 
                    { value: 3 }
                ];
                
                var c = Comparators.byProperty("value", Comparators.DEFAULT);

                assertInputGivesExpectedOutput(c, input, expected);
            });
        });

        suite("byProperty", function() {
            test("basic", function() {
                var input = [
                    { index: 2 },
                    { index: 3 },
                    { index: 1 }
                ];
                var expected = [
                    { index: 1 },
                    { index: 2 },
                    { index: 3 }
                ];

                var c = Comparators.byProperty("index", Comparators.DEFAULT);
                assertInputGivesExpectedOutput(c, input, expected);
            }); 
        });
        
        suite("composite", function() {
            test("basic", function() {
                var input = [
                    { index: 2, extra: 3 },
                    { index: 2, extra: 2 },
                    { index: 3 },
                    { index: 1 }
                ];
                var expected = [
                    { index: 1 },
                    { index: 2, extra: 2 },
                    { index: 2, extra: 3 },
                    { index: 3 }
                ];

                var c = Comparators.composite([
                    Comparators.byProperty("index"),
                    Comparators.byProperty("extra")
                ]);
                assertInputGivesExpectedOutput(c, input, expected);
            }); 
        });

        suite("array", function() {
            test("differ in length", function() {
                var input = [
                    ['z'],
                    ['a', 'b', 'c', 'd'],
                    ['a', 'b', 'c']
                ];

                var expected = [
                    ['a', 'b', 'c'],
                    ['a', 'b', 'c', 'd'],
                    ['z']
                ];

                var c = Comparators.array();
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test("identical", function() {
                var input = [
                    ['a', 'b', 'c'],
                    ['a', 'b', 'c']
                ];

                var c = Comparators.array();
                ok(c.equal(input[0], input[1]));
            });

            test("with objects, by property", function() {
                var input = [
                    [ { value: 2 }, { value: 1 }, { value: 3 } ],
                    [ { value: 1 }, { value: 1 }, { value: 3 } ],
                    [ { value: 1 }, { value: 2 }, { value: 3 } ]
                ];
                var expected = [
                    [ { value: 1 }, { value: 1 }, { value: 3 } ],
                    [ { value: 1 }, { value: 2 }, { value: 3 } ],
                    [ { value: 2 }, { value: 1 }, { value: 3 } ]                    
                ];

                var c = Comparators.array(
                    Comparators.byProperty("value", Comparators.DEFAULT)
                );

                assertInputGivesExpectedOutput(c, input, expected);
            });
        });
    });
});