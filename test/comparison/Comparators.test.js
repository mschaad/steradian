define(['mocha', 'chai', 'comparison/Comparators', 'Arrays'], 
function (mocha, chai, Comparators, Arrays) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal,
        throws = assert.throws;

	suite("Comparators", function () {
        function sort(a, comparator) {
            var clone = Arrays.clone(a);
            clone.sort(comparator);
            return clone;
        }

        function assertInputGivesExpectedOutput(comparator, input, expected) {
            var actual = sort(input, comparator);
            deepEqual(expected, actual);
        }

        suite("DEFAULT", function() {
            var c = Comparators.DEFAULT;

            test('strings', function() {
                var input = ["b", "a", "c"];
                var expected = ["a", "b", "c"];
                assertInputGivesExpectedOutput(c, input, expected);
            });

            test('numbers', function() {
                var input = [ 2, 1, 3 ];
                var expected = [1, 2, 3];
                assertInputGivesExpectedOutput(c, input, expected);
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
                var expected = ["a", "b", "c"];
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
    });
});