define(['Mocha', 'Chai', 'Enum'], function(mocha, chai, Enum) {
    var suite = mocha.suite,
        test = mocha.test;

    var assert = chai.assert;
    var equal = assert.equal,
        deepEqual = assert.deepEqual,
        ok = assert.ok;

    suite('Enum', function() {

        test('constructor', function() {
            var MetasyntacticVariables = Enum.create(['FOO','BAR','BAZ']);

            equal(MetasyntacticVariables.FOO, 0);
            equal(MetasyntacticVariables.BAR, 1);
            equal(MetasyntacticVariables.BAZ, 2);

            deepEqual(MetasyntacticVariables.values(), ['FOO', 'BAR', 'BAZ']);
        });
        
        test('contains', function() {
            var MetasyntacticVariables = Enum.create(['FOO','BAR','BAZ']);

            ok(MetasyntacticVariables.contains("FOO"));
            equal(MetasyntacticVariables.contains("FAKE"), false);
        });
    });
});