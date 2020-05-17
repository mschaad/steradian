define(['Mocha', 'Chai', 'Enum', 'Guard'], function(mocha, chai, Enum, Guard) {
    var suite = mocha.suite,
        test = mocha.test;

    var assert = chai.assert;
    var equal = assert.equal,
        deepEqual = assert.deepEqual,
        ok = assert.ok;

    suite('Enum', function() {

        function createMetasyntacticVariables() {
            var MetasyntacticVariables = Enum.create({
                name: 'MetasyntacticVariables',
                values: ['FOO','BAR','BAZ']
            });
            return MetasyntacticVariables;
        }

        suite('Enum.create', function() {
            test('does not throw', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                ok(MetasyntacticVariables);
            });
            test('Enum has name', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                equal(MetasyntacticVariables.name, "MetasyntacticVariables");
            });
            test('creates instances as properties on Enum class', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                ok(MetasyntacticVariables.FOO);
                ok(MetasyntacticVariables.BAR);
                ok(MetasyntacticVariables.BAZ);
            });
            test('starts numbering at 0', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                equal(MetasyntacticVariables.FOO.value(), 0);
                equal(MetasyntacticVariables.BAR.value(), 1);
                equal(MetasyntacticVariables.BAZ.value(), 2);
            });
            test('class is frozen', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                var FOO = MetasyntacticVariables.FOO;
                MetasyntacticVariables.FOO = 2;
                equal(MetasyntacticVariables.FOO, FOO);
            });
        });

        suite('static methods', function() {
            suite('isInstance', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                var propertyValues = [
                    MetasyntacticVariables.FOO,
                    MetasyntacticVariables.BAR,
                    MetasyntacticVariables.BAZ
                ];
                
                propertyValues.forEach(function(v) {
                    test('isInstance' + v.name(), function() {
                        MetasyntacticVariables.isInstance(v);
                    });                   
                });

                var nonEnumValues = [
                    null,
                    undefined,
                    {},
                    4
                ];
                
                nonEnumValues.forEach(function(v) {
                    test('non-instance ' + v, function() {
                        equal(MetasyntacticVariables.isInstance(v), false);
                    });
                });
            });

            test('Enum class has values() method that returns all values', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
                deepEqual(MetasyntacticVariables.values().map(function(v) { return v.name(); }), ['FOO', 'BAR', 'BAZ']);
            });

            test('Enum class has contains() method that works with strings', function() {
                var MetasyntacticVariables = createMetasyntacticVariables();
    
                ok(MetasyntacticVariables.contains("FOO"));
                equal(MetasyntacticVariables.contains("FAKE"), false);
            });

            function assertIsFoo(value) {
                ok(value);
                equal(value.name(), 'FOO');
            }

            suite('tryGet(name)', function() {
                test('happy path', function() {
                    var MetasyntacticVariables = createMetasyntacticVariables();
                    var FOO = MetasyntacticVariables.tryGet("FOO");
                    assertIsFoo(FOO);
                });
                test('returns false on invalid name', function() {
                    var MetasyntacticVariables = createMetasyntacticVariables();
                    var value = MetasyntacticVariables.tryGet("FAKE");
                    equal(value, false);
                });
            });
            suite('get(name)', function() {
                test('happy path', function() {
                    var MetasyntacticVariables = createMetasyntacticVariables();
                    var FOO = MetasyntacticVariables.get("FOO");
                    assertIsFoo(FOO);
                });
                test('throws on invalid name', function() {
                    var MetasyntacticVariables = createMetasyntacticVariables();
                    assert.throws(function() {
                        MetasyntacticVariables.get("FAKE");
                    });
                });
            });
        });
    });
});